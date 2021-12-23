// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


// 示例 1:

// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let mid = 0;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) {
      right = mid - 1;
    }
    else left = mid + 1;
  }
  return -1;
};

function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while(left<right) {
    let mid = Math.floor((left+right)/2);
    if(nums[mid] === target) return mid;
    else if(nums[mid] > target) {
      right = mid;
    } else {
      left = mid;
    }
  }

  return -1;
}

