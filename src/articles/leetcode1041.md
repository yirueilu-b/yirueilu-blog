# LeetCode 1041. Robot Bounded In Circle

![](https://dkmonster.github.io/assets/images/leetcode/LeetCode_Sharing.png)

## Description

On an infinite plane, a robot initially stands at (0, 0) and faces north.  The robot can receive one of three instructions:

- ``"G"``: go straight 1 unit;
- ``"L"``: turn 90 degrees to the left;
- ``"R"``: turn 90 degress to the right.

The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.

**Example 1:**
```
Input: "GGLLGG"
Output: true
Explanation: 
The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.
```

**Example 2:**
```
Input: "GG"
Output: false
Explanation: 
The robot moves north indefinitely.
```

**Example 3:**
```
Input: "GL"
Output: true
Explanation: 
The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...
```
Note:

- 1 <= instructions.length <= 100
- instructions[i] is in {'G', 'L', 'R'}

## Idea

Follow the given instructions to move the robot then check some conditions to determine if it is in a circle.

The first condition to check is the final position of the robot and its initial position. It's trivial that if the positions are the same, it is in a circle.

The second condition is checking the initial and final directions. The robot's initial direction is North, if its final direction is not the same as its initial direction then it is in a circle.

## Code

```python
class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        init_position = [0, 0]
        position = [0, 0]
        init_direction = (0, 1)
        direction = (0, 1)
        for instruction in instructions:
            if instruction == "G":
                position[0] += direction[0]
                position[1] += direction[1]
            elif instruction == "L":
                if direction == (0, 1):
                    direction = (-1, 0)
                elif direction == (-1, 0):
                    direction = (0, -1)
                elif direction == (0, -1):
                    direction = (1, 0)
                else:
                    direction = (0, 1)
            else:
                if direction == (0, 1):
                    direction = (1, 0)
                elif direction == (1, 0):
                    direction = (0, -1)
                elif direction == (0, -1):
                    direction = (-1, 0)
                else:
                    direction = (0, 1)
        return init_position == position or init_direction != direction
```

## Note

The key of this problem is to think of the condition of final direction.

Remember to read the description carefully!

###### tags: `Coding`