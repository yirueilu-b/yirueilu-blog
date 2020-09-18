# Multiple Hand Tracking Using MediaPipe Models in Python

Google MediaPipe has released their paper and models of hand tracking recently. After reading the paper, I am so impressed by their work. They use some clever methods to simplify the hand tracking task thus make it possible to do this task in real-time and keep great performance. Then I start to try playing with the models in Python, In this post, I take some notes of how to use their models in Python and create a simple demo with webcam. The complete code could be found [here](https://github.com/yirueilu-b/HandTracking)

## The Hand Tracking Workflow

As the graph provided by MediaPipe below, we could summarize the steps which multiple hand tracking process takes like: 

$numHand = 0$

$isFirstFrame = True$

$while \space True:$

$\quad frame = readFrame()$

$\quad inputFrame = preprocessImage(frame)$

$\quad if \space isFirstFrame \space or \space numHand < expectNumHand:$

$\quad \quad isFirstFrame = False$

$\quad \quad keyPoints = detectPalm(inputFrame)$

$\quad \quad hand = cropHandFromPalmRes(inputFrame, 
keyPoints)$

$\quad else:$

$\quad \quad hand = cropHandFromPrevRes(inputFrame, 
landmark)$

$\quad landmark, isHand = detectLandmark(hand)$

$\quad drawLandmark()$

![](https://i.imgur.com/x5xVgad.png)

## Write the Code of Components in Workflow

According to the above algorithm, we could write the actual Python code to implement the hand tracking demo now

### preprocessImage

The input image of palm detector should be: 
- converted to `RGB`
- padded to square with zeros
- resized to `(256, 256)`
- normalized by `2 * ((image / 255) - 0.5)`

```python
def preprocess(bgr_image, w, h):
    # convert to rgb
    rgb_image = bgr_image[:, :, ::-1]
    # pad to square and resize
    shape = np.r_[rgb_image.shape]
    padding = (shape.max() - shape[:2]).astype('uint32') // 2
    rgb_image = np.pad(rgb_image, ((padding[0], padding[0]), (padding[1], padding[1]), (0, 0)), mode='constant')
    padding_image = rgb_image.copy()

    rgb_image = cv2.resize(rgb_image, (w, h))
    # normalize
    input_image = np.ascontiguousarray(2 * ((rgb_image / 255) - 0.5).astype('float32'))
    padding_image = np.ascontiguousarray(2 * ((padding_image / 255) - 0.5).astype('float32'))
    return input_image, padding_image, padding
```

![](https://i.imgur.com/rbBgVNT.png)

### detectPalm

Pass the preprocessed image to `detectPalm` to get corresponding 7 key points and bounding box of palm

![](https://i.imgur.com/n4pGw1I.png)

```python
# inference
def detect_palm(input_image, palm_detector, input_details, output_details):
    palm_detector.set_tensor(input_details[0]['index'], input_image.reshape(1, 256, 256, 3))
    palm_detector.invoke()
    output_reg = palm_detector.get_tensor(output_details[0]['index'])[0]
    output_clf = palm_detector.get_tensor(output_details[1]['index'])[0, :, 0]
    return output_reg, output_clf
```

>shape of output_reg -> (number of anchors, number of predictions)
>shape of output_clf -> (number of anchors, 1)
>- number of anchors = 2944
>- number of predictions = 18 
>    - 0 to 4 are bounding box offset, width and height: dx, dy, w ,h
>    - 4 to 18 are 7 hand keypoint x and y coordinates: x1, y1, x2, y2, ..., x7, y7
>
>**output_reg: bounding boxes and keypoints**
>**output_clf: confidence of each anchors**

```python
# get actual coordinate of key points from prediction
def get_res_from_palm_detector(output_reg, output_clf):
    # normalize scores to range 0 to 1 using sigmoid
    scores = sigmoid(output_clf)
    # filter by threshold
    output_reg = output_reg[scores > DETECTION_THRESHOLD]
    output_clf = output_clf[scores > DETECTION_THRESHOLD]
    candidate_anchors = anchors[scores > DETECTION_THRESHOLD]
    if output_reg.shape[0] == 0: print("No hands found")
    # get actual coordinate by pre-defined anchor
    moved_output_reg = output_reg.copy()
    moved_output_reg[:, :2] = moved_output_reg[:, :2] + candidate_anchors[:, :2] * 256
    # NMS for bounding boxes
    box_ids = fast_nms(moved_output_reg[:, :4], output_clf, NMS_THRESHOLD)
    # convert the coordinates back to the scale in original image size
    box_list = moved_output_reg[box_ids, :4].astype('int')
    side_list = []
    key_point_list = moved_output_reg[box_ids, 4:].reshape(-1, 7, 2)
    center_wo_offst = candidate_anchors[box_ids, :2] * 256
    for i in range(len(key_point_list)):
        key_point_list[i] = key_point_list[i] + center_wo_offst[i]
        x, y, w, h = box_list[i]
        side_list.append(max(w, h) * BOX_ENLARGE)
    return key_point_list, side_list
```

![](https://i.imgur.com/ftZrqPW.png)

### preprocessForLandmarkModel

Use the keypoints to crop hand on image and rotate to the specific angle. With `getAffineTransform` function, we could define the matrices then get the cropped hand image directly.

![](https://i.imgur.com/fYFInLE.png)

```python
def get_hand(input_image, key_points, side):
    source = get_triangle(key_points[0], key_points[2], side)
    source -= (key_points[0] - key_points[2]) * BOX_SHIFT
    transform_mat = cv2.getAffineTransform(source * max(input_image.shape) / INPUT_WIDTH, TARGET_TRIANGLE)
    hand = cv2.warpAffine(input_image, transform_mat, (INPUT_WIDTH, INPUT_HEIGHT))
    return hand, source
```

### detectLandmark

Pass the preprocessed image to `detectLandmark` to get corresponding 21 key points of hand

![](https://i.imgur.com/AsUnjLW.png)

```python
def detect_landmark(hand, landmark_model, input_details, output_details):
    landmark_model.set_tensor(input_details[0]['index'], hand.reshape(1, 256, 256, 3))
    landmark_model.invoke()
    landmark = landmark_model.get_tensor(output_details[0]['index']).reshape(-1, 2)
    is_hand = landmark_model.get_tensor(output_details[1]['index']) > HAND_THRESHOLD
    return landmark, is_hand
```
```python
def convert_landmark_back(joints, source, padding, image):
    # projecting keypoints back into original image coordinate space
    transform_mat = cv2.getAffineTransform(source * max(image.shape) / INPUT_WIDTH, TARGET_TRIANGLE)
    transform_mat = np.pad(transform_mat.T, ((0, 0), (0, 1)), constant_values=1, mode='constant').T
    transform_mat[2, :2] = 0
    transform_mat_inv = np.linalg.inv(transform_mat)
    landmark = (np.pad(joints, ((0, 0), (0, 1)), constant_values=1, mode='constant') @ transform_mat_inv.T)[:, :2]
    landmark -= padding[::-1]

    # projecting keypoints back into input image coordinate space
    landmark_input = landmark + padding[::-1]
    landmark_input = landmark_input * INPUT_WIDTH / max(image.shape)
    return landmark, landmark_input
```

![](https://i.imgur.com/DeNgmEH.png)

### Visualize the Hand Tracking Process

![](https://i.imgur.com/oxYN0kv.png)

## Pulling it all together

```python
import tensorflow as tf
from hand_tracking_utils import *

WINDOW_NAME = 'MediaPipe Hand Tracking'
PALM_MODEL_PATH = os.path.join('models', 'palm_detection_without_custom_op.tflite')
LANDMARK_MODEL_PATH = os.path.join('models', 'hand_landmark.tflite')
NUM_TRACK_HAND = 2

if __name__ == '__main__':
    cap = cv2.VideoCapture(1)
    cv2.resizeWindow(WINDOW_NAME, IMAGE_WIDTH, IMAGE_HEIGHT)
    # load palm model
    palm_model = tf.lite.Interpreter(model_path=PALM_MODEL_PATH)
    palm_model.allocate_tensors()
    palm_input_details = palm_model.get_input_details()
    palm_output_details = palm_model.get_output_details()
    # load landmark model
    landmark_model = tf.lite.Interpreter(model_path=LANDMARK_MODEL_PATH)
    landmark_model.allocate_tensors()
    landmark_input_details = landmark_model.get_input_details()
    landmark_output_details = landmark_model.get_output_details()
    # out = cv2.VideoWriter('output.mp4', -1, 5., (640, 480))
    num_valid_hand = 0
    is_first_frame = True
    prev_res = None
    while True:
        # read and preprocess a frame
        _, frame = cap.read()
        input_image, padding_image, padding = preprocess(frame, INPUT_WIDTH, INPUT_HEIGHT)
        if is_first_frame or num_valid_hand < NUM_TRACK_HAND:
            print("Palm Detector Activated!")
            is_first_frame = False
            output_reg, output_clf = detect_palm(input_image, palm_model, palm_input_details, palm_output_details)
            key_point_list, side_list = get_res_from_palm_detector(output_reg, output_clf)
        else:
            print("Palm Detector Not Activated!")
            key_point_list, side_list = get_res_from_prev_res(prev_res)

        prev_res = []
        for i in range(len(key_point_list)):
            hand, source = get_hand(padding_image, key_point_list[i], side_list[i])
            landmark, is_hand = detect_landmark(hand, landmark_model, landmark_input_details, landmark_output_details)
            if is_hand:
                landmark, landmark_input = convert_landmark_back(landmark, source, padding, frame)
                frame = draw_landmark(frame, landmark)
                prev_res.append(landmark_input)

        num_valid_hand = len(prev_res)
        cv2.imshow(WINDOW_NAME, frame)
        # out.write(original_frame)

        # press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            cap.release()
            cv2.destroyAllWindows()
            break

    cap.release()
    cv2.destroyAllWindows()
```

## Result

![](https://i.imgur.com/dRv6k7w.gif)


###### tags: `Machine Learning`