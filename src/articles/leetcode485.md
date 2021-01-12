# LeetCode 485. Max Consecutive Ones

![](https://dkmonster.github.io/assets/images/leetcode/LeetCode_Sharing.png)

## Description

Given a binary array, find the maximum number of consecutive 1s in this array.

**Example 1:**
```
Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
    The maximum number of consecutive 1s is 3.
```

**Note:**
- The input array will only contain 0 and 1.
- The length of input array is a positive integer and will not exceed 10,000

## Idea

Trivial, just use a for loop to iterate through the `nums` array.

First we keep two variables `ans` and `temp_ones`, `ans` is for recording max consecutive ones and `temp_ones` is for recording current consecutive ones.

In the for loop, if the value is equal to 1 then we add `temp_ones` by 1 else clear `temp_ones` as 0

and in the end of every iteration, we update `ans` by comparing `temp_ones` and `ans` thus keep `ans` as maximum consecutive ones.


## Solution

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        ans = 0
        temp_ones = 0
        for n in nums:
            if n == 1:
                temp_ones += 1
            else:
                temp_ones = 0
            ans = max(temp_ones, ans)
        return ans
```
> **Complexity**
> - Time complexity: `O(n)`
>   Iterate through `n` given `nums`
> - Space complexity: `O(1)`
>   Only constant variables for keeping number of consecutive ones and max number of consecutive ones

## Note

- Visualize the process:

```python
def plot_nums(nums, index1, index2, ans):
    length = len(nums)
    height = 1
    plt.figure(figsize=(length,4))
    plt.xlim([-1, length+1])
    plt.ylim([-1.5, 2.5])
    # plot arr
    rect = patches.Rectangle((0, 0), length, height, lw=1, fill=0, ec='steelblue')
    plt.gca().add_patch(rect)
    for i in range(length):
        plt.plot([i, i], [height, 0], c='steelblue', lw=1)
        plt.text(i + 0.5 - 0.08*len(str(i)), 1 + 0.08, i, fontsize=10, color='steelblue')
        plt.text(i + 0.5 - 0.09, 0.5 - 0.09, nums[i], fontsize=14, color='r')
    # plot current ones
    rect = patches.Rectangle((index1+1, 0), -index2, height, lw=1, fc=(0.19607843, 0.80392157, 0.19607843, 0.2))
    plt.gca().add_patch(rect)
    # arrow for index
    if index1 >= 0:
        plt.arrow(index1 + 0.5, 1.8, 0, -0.25, head_width=0.1, color='k')

    if index1 == -1:
        index1 = 'init'
    plt.title('i = {}\ncurrent number of ones = {}\nans = {}'.format(index1, index2, ans))

    plt.axis('off')
    plt.tight_layout()
    # plt.savefig('{}.jpg'.format(index1))
    plt.show()

nums = [1,1,0,1,1,0,1,1,1]
ans = 0
temp_ones = 0
plot_nums(nums, -1, temp_ones, ans)
for i, n in enumerate(nums):
    if n == 1:
        temp_ones += 1
    else:
        temp_ones = 0
    ans = max(temp_ones, ans)
    plot_nums(nums, i, temp_ones, ans)
```

![](https://github.com/yirueilu-b/coding-problems-and-notes/raw/master/leetcode/arrays101/max_consecutive_ones.gif)

###### tags: `Coding`