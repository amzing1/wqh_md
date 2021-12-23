// 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

// 必须 原地 修改，只允许使用额外常数空间。

//  

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[1,3,2]
// 示例 2：

// 输入：nums = [3,2,1]
// 输出：[1,2,3]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/next-permutation
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


function nextPermutation(nums) {
  if(nums.length===0) throw 'error';
  if(nums.length===1) return nums[0];
  let isMax = true;
  let index = 0;
  for(let i=nums.length-2;i>=0;i--) {
    for(let j=nums.length-1;j>i;j--) {
      if(nums[i] < nums[j]) {
        isMax = false;
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
        index = i+1;
        break;
      }
    }
    if(!isMax) break;
  }
  let start = 0;
  if(!isMax) {
    start = index;
  }
  for(let i=start;i<nums.length;i++) {
    for(let j=nums.length-1;j>i;j--) {
      if(nums[i]>nums[j]) {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
  }
  return nums;
  
}

function nextPermutation(nums) {
  if(nums.length<=1) return nums;
  let startSortIndex = 0;
  let l = nums.length;
  let last = l-1;
  for(let i=l-2;i>=0;i--) {
    for(let j=last;j>i;j--) {
      if(nums[j]>nums[i]) {
        let temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
        startSortIndex = i+1;
        break;
      }
    }
    if(startSortIndex!==0) break;
  }
  for(let i=startSortIndex;i<l;i++) {
    for(let j=l-1;j>i;j--) {
      if(nums[i]>nums[j]) {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
  }
  return nums;
}
