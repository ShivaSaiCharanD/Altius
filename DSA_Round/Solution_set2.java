// 🧑‍💻 Intern (0–1 Years Experience) 
// Given an integer array nums, return the length of the longest strictly increasing subsequence. Come up with an algorithm that runs in O(n log(n)) time complexity

// Example 1:
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

// Example 2:
// Input: nums = [0,1,0,3,2,3]
// Output: 4

// Example 3:
// Input: nums = [7,7,7,7,7,7,7]
// Output: 1
 
// Constraints:
// •	1 <= nums.length <= 2500
// •	-104 <= nums[i] <= 104
// Focus Areas:
// •	Dynamic Programming
// •	Binary Search
// •	Time and space optimisation


import java.util.*;

public class Solution_set2{
    public static int solve(int n,int[] arr){
        int res = 0;
        int[] dp = new int[n+1];
        Arrays.fill(dp, 1);
        for(int i=0;i<n;i++){
            for(int j=0;j<i;j++){
                if(arr[i] > arr[j]){
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            res = Math.max(res, dp[i]);
        }
        return res;
    }
    public static void main(String[] args){
        Scanner s = new Scanner(System.in);
        String[] input = s.nextLine().split(" ");
        int n = input.length;
        int arr[] = new int[n];
        for(int i=0;i<n;i++){
            arr[i] = Integer.parseInt(input[i]);
        }
        System.out.println(solve(n,arr));
        s.close();
    }
}