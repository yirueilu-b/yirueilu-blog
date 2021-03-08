# LeetCode 3. Longest Substring Without Repeating Characters

![](https://dkmonster.github.io/assets/images/leetcode/LeetCode_Sharing.png)

## Description

Given a string `s`, find the length of the **longest substring** without repeating characters.

**Example 1:**

```plaintext
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**

```plaintext
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```plaintext
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Example 4:**

```plaintext
Input: s = ""
Output: 0
```

**Constraints:**
- `0 <= s.length <= 5 * 104`
- `s` consists of English letters, digits, symbols and spaces.

## Idea

**Idea 1**

Brute force, go trough all substrings of `s`, for example: given `s = "abc"`, we could easily find its all substrings is `["a", "ab", "abc", "b", "bc", "c"]` by using for loops, and we could check if each subtring is repeating and keep lenghth of longest substring without repeating while iterating through the substrings

**Idea 2**

Using a sliding widow and keep the substring in window be always without duplicate characters by contracting and extending it

**Idea 3**

We could further optimize sliding widow idea by optimizing the contracting step.
In sliding widow idea, when we encounter duplicate character `c`, we contract the window by moving left pointer one by one untill we met the same character.
We could just keep the previous index of each character then we are able to take only one step to contract the window to the right position.

## Solution

**Solution 1 (TLE)**

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        ans = 0
        for i in range(len(s)):
            for j in range(i+1, len(s)+1):
                temp = {}
                is_repeat = False
                for letter in s[i:j]:
                    if letter not in temp:
                        temp[letter] = 1
                    else:
                        is_repeat = True
                        break
                if not is_repeat:
                    ans = max(ans, len(temp))
        return ans
```

> **Complexity**
> - Time complexity: `O(n^3)`        
>   For all substrings `O(n^2)` need `O(n)` to check if duplicate
> - Space complexity: `O(m)`    
>   `m` is the number of characters in given character set

**Solution 2**

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        ans = 0
        left = 0
        right = 0
        # [32, 126] are ascii value for all eglish letters, digits, symbols and spaces
        # if not remenbering the ascii range, just use an empty dict and check if character is in the dict
        # but it takes extra time to check existence
        history = dict(zip([chr(i) for i in range(32, 127)], [0 for _ in range(32, 127)]))    
        for i in range(len(s)):
            history[s[i]] += 1
            while history[s[i]] > 1:
                history[s[left]] -= 1
                left += 1
            ans = max(ans, i-left+1)
        return ans
```

> **Complexity**
> - Time complexity: `O(n)`        
>   Maximum is `2n` of contracting and extending
> - Space complexity: `O(m)`

**Solution 3**

```python
def lengthOfLongestSubstring(s: str) -> int:
    ans = 0
    left = 0
    history = dict(zip([chr(i) for i in range(32, 127)], [-1 for _ in range(32, 127)]))
    for i, c in enumerate(s):
        if left <= history[c] < i: 
            left = history[c] + 1
        else: 
            ans = max(ans, i-left+1)
        history[c] = i
    return ans
```

> **Complexity**
> - Time complexity: `O(n)`
> - Space complexity: `O(m)`

## Note

**Visualize Optimized Sliding Window Approach**

```python
s = 'abcabcbb'
s = list(s)
length = len(s)
height = 1

history_ans = []
history_dict = []
history_left = []
history_right = []
history_repeat = []

ans = 0
left = 0
history = dict(zip([chr(i) for i in range(32, 127)], [-1 for _ in range(32, 127)]))
for i, c in enumerate(s):
    if left <= history[c] < i:
        history_ans.append(ans)
        history_dict.append(["{}:{}".format(k, v) for k, v in history.items() if v > -1])
        history_left.append(left)
        history_right.append(i)
        history_repeat.append(True)
        left = history[c] + 1
        history_ans.append(ans)
        history_dict.append(["{}:{}".format(k, v) for k, v in history.items() if v > -1])
        history_left.append(left)
        history_right.append(i)
        history_repeat.append(False)
    else:
        ans = max(ans, i-left+1)
        history_ans.append(ans)
        history_dict.append(["{}:{}".format(k, v) for k, v in history.items() if v > -1])
        history_left.append(left)
        history_right.append(i)
        history_repeat.append(False)
    history[c] = i
```
```python
fig = plt.figure(figsize=(int(length * 1.5), int(4 * 1.5)))
ax = fig.add_subplot(111)
ax.set_xlim(-1, length + 1)
ax.set_ylim(-1.5, 2.5)
# plot rectangles and letters for `s` array
for i in range(length):
    plt.plot([i, i], [height, 0], c='steelblue', lw=1)[0]
    plt.text(i + 0.5 - 0.08 * len(str(i)), 1 + 0.08, i, fontsize=10, color='steelblue')
    plt.text(i + 0.5 - 0.09, 0.5 - 0.09, s[i], fontsize=14, color='k')
arr_rect = patches.Rectangle((0, 0), length, height, lw=1, fill=0, ec='steelblue')
# init title
title = plt.title('i = {}\ncurrent number of ones = {}\nans = {}'.format('init', 0, 0), fontsize=14)
# highlight ones
index_rect = patches.Rectangle((0, 0), 0, 0, lw=1, fc=(0.19607843, 0.80392157, 0.19607843, 0.2))
# point out current index
arrow_i = plt.arrow(0, 0, 0, 0, head_width=0, color='k')
arrow_j = plt.arrow(0, 0, 0, 0, head_width=0, color='k')
text_i = plt.text(0, 2.1, '', fontsize=10, color='k')
text_j = plt.text(0, 1.9, '', fontsize=10, color='k')

# animation init
def init():
    ax.add_patch(arr_rect)
    ax.add_patch(index_rect)
    ax.add_patch(arrow_i)
    ax.add_patch(arrow_j)
    return 

# animation function, iterate through the result
def animate(frame):
    title.set_text('iteration = {}\ndict = {}\ncurrent ans = {}'.format(frame, history_dict[frame], history_ans[frame]))
    index_rect.set_width(history_right[frame] - history_left[frame] + 1)
    index_rect.set_height(1)
    index_rect.set_xy([history_left[frame], 0])
    index_rect.set_color((0.19607843, 0.80392157, 0.19607843, 0.2))
    if history_repeat[frame]:
        index_rect.set_color((0.80392157, 0.19607843, 0.19607843, 0.2))
    if frame > 0:
        ax.patches.remove(ax.patches[-1])
        ax.patches.remove(ax.patches[-1])
        ax.patches.remove(ax.patches[-1])
        ax.patches.remove(ax.patches[-1])
    arrow_i = plt.arrow(history_left[frame] + 0.5, 1.8, 0, -0.25, head_width=0.1, color='k')
    arrow_j = plt.arrow(history_right[frame] + 0.5, 1.8, 0, -0.25, head_width=0.1, color='k')
    ax.add_patch(arrow_i)
    ax.add_patch(arrow_j)
    text_i.set_x(history_left[frame]+0.35)
    text_j.set_x(history_right[frame]+0.35)
    text_i.set_text("left={}".format(history_left[frame]))
    text_j.set_text("right={}".format(history_right[frame]))
    return 
    
# hide axis
anim = animation.FuncAnimation(fig, 
                               func=animate,
                               init_func=init,
                               frames=len(history_ans),
                               interval=0.9487*1000,
                              )
plt.axis('off')
animation_html = HTML(anim.to_jshtml())
# prevent plt show the final plot
plt.close()
animation_html
```

![](https://github.com/yirueilu-b/coding-problems-and-notes/raw/master/leetcode/3_longest_substring_without_repeating_characters_sliding_window_opt.gif)

###### tags: `Coding`