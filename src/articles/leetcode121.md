# LeetCode 121. Best Time to Buy and Sell Stock

![](https://dkmonster.github.io/assets/images/leetcode/LeetCode_Sharing.png)

## Description

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

**Example 1:**

```
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
```             

**Example 2:**

```
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

## Idea

**Idea 1**

Brute-force, find all pair and return the pair which makes the profit maximal

**Idea 2**

Try to find the optimal substructure and overlapping sub-problems and use dynamic programming. 

```
max_profit_sell_on_day_0 = 0

i=1
[7] 1
max profit sell on day 1:
max(max_profit_sell_on_day_0 + prices[1] - prices[0], prices[1] - prices[0]) = 0
max(-6 + (-6), 0) = -6

i=2
[7,1] 5
max profit sell on day 2 is 
max(max_profit_sell_on_day_1 + prices[2] - prices[1], prices[2] - prices[1])
max(-6 + 4, 4) = 4

i=3
[7,1,5] 3
max profit sell on day 3 is 
max(max_profit_sell_on_day_2 + prices[3] - prices[2], prices[3] - prices[2]) = 0
max(4 + (-2), -2) = 2

i=4
[7,1,5,3] 6 
max profit sell on day 4 is 
max(max_profit_sell_on_day_3 + prices[4] - prices[3], max_profit_on_day) = 0
max(2 + 3, 3) = 5

i=5
[7,1,5,3,6] 4
max profit sell on day 5 is 
max(max_profit_sell_on_day_4 + prices[5] - prices[4], max_profit_on_day) = 0
max(5 + (-2), -2) = 3
```

## Solution

**Solution 1 ( TLE )**
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        for i in range(len(prices)-1):
            for j in range(i+1, len(prices)):
                max_profit = max(max_profit, prices[j] - prices[i])
        return max_profit
```
> **Complexity**
> - Time complexity: `O(n^2)`     
>   For every price on day `i`, we need to calculate for `i+1` to `n` prices
>   and `i = 0 to n-1` so the cost in total is `n + (n-1) + ... + 1 -> O(n^2)`
> - Space complexity: `O(1)`     
>   Trivial
>   
**Solution 2**
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit, dp = 0, 0
        for i in range(0, len(prices) - 1):
            profit_day_i = prices[i+1] - prices[i]
            dp = max(dp + profit_day_i, profit_day_i)
            max_profit = max(max_profit, dp)
        return max_profit
```
> **Complexity**
> - Time complexity: `O(n)`     
>   Iterate through the prices
> - Space complexity: `O(1)`     
>   Trivial

## Note

Visualize Idea 2:

```python
prices = [7,1,5,3,6,4]
days = range(len(prices))
plt.figure(figsize=(16, 8))
ans, dp = 0, 0
buy_at = 0
sell_at = 0
for i in range(0, len(prices)-1):
    q = prices[i+1] - prices[i]
    if dp + q <= q:
        buy_at = i
    sell_at = i+1
    dp = max(dp + q, q)    
    ans = max(ans, dp)
    plt.subplot(2, 3, i+1)
    plt.title("day" + str(i+2))
    # Draw prices
    plt.plot(days[:i+2], prices[:i+2], '-o')
    # Current price
    plt.scatter(days[i+1], prices[i+1], c='r', s=150)
    # Difference on day i
    plt.plot([days[i]-0.5, days[i+1]+0.5], [prices[i],]*2, '--', c='darkorange', label='immediately', linewidth=3)
    plt.plot([days[i]-0.5, days[i+1]+0.5], [prices[i+1],]*2, '--', c='darkorange', linewidth=3)
    # Best buy and current sell
    plt.plot(range(-1, 7), [prices[buy_at],]*8, '-', c='g', label='Best buy', alpha=0.5)
    plt.plot(range(-1, 7), [prices[sell_at],]*8, '-', c='r', label='Sell', alpha=0.5)    
    
    plt.legend(loc="lower right")
    plt.axis([-1, 6, 0, 8])
    plt.grid()
plt.show()
```

![](https://i.imgur.com/bHGdLFw.png)


###### tags: `Coding`