// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。
export function searchRange(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;
  const res = [-1, -1];
  let index = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      index = mid;
      break;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  if (index !== -1) {
    res[0] = index;
    res[1] = index;
    while (nums[res[0]] === target) {
      res[0] = res[0] - 1;
    }
    while (nums[res[1]] === target) {
      res[1] = res[1] + 1;
    }
    res[0]++;
    res[1]--;
  }
  return res;
};