//最长上升子序列

function getRes(nums) {
    let dp = new Array(nums.length);
    dp[0] = 1;
    let max = 1;
    for(let i=1; i<nums.length; i++) {
        dp[i] = 1;
        for(let j=0;j<i;j++) {
            if(nums[j]<nums[i]) {
                dp[i] = Math.max(dp[i],dp[j]+1);
                max = dp[i] > max ? dp[i] : max;
            }
        }
    }
    return max;
}