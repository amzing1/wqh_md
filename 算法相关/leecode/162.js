/**
 * @param {number[]} nums
 * @return {number}
 */
function isPeak(nums, i) {
    if(i===0) {
        if(nums[i]>nums[i+1]) return true;
    } else if(i===nums.length-1) {
        if(nums[i]>nums[i-1]) return true;
    } else {
        if(nums[i]>nums[i-1]&&nums[i]>nums[i+1]) return true;
    }
    return false;
}
 var findPeakElement = function(nums) {
    if(nums.length===1) return 0;
    for(let i=0;i<nums.length;i++) {
        if(isPeak(nums,i)) {
            return i;
        }
    }
    return 0;

};