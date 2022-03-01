// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作

function moverZeroes(nums: number[]) {
  let fast = 0;
  let slow = 0;
  const l = nums.length;
  while (fast < l) {
    if (nums[fast] !== 0) {
      const tmp = nums[slow];
      nums[slow] = nums[fast];
      nums[fast] = tmp;
      slow++;
    }
    fast++;
  }
}
