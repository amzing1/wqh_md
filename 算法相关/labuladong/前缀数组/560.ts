/***
 * 给你一个整数数组nums和一个整数数组k,请你统计并返回该数组中和为k的连续子数组的个数
 */

// export function solute(nums: number[], k: number): number {
//   const preSum: number[] = new Array(nums.length + 1).fill(0)
//   for (let i = 0; i < nums.length; i++) {
//     preSum[i + 1] = preSum[i] + nums[i]
//   }
//   let res: number = 0
//   for(let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length; j++) {
//       const sum = preSum[j + 1] - preSum[i]
//       if (sum === k) {
//         res++
//       }
//     }
//   }
//   return res
// }

// // optimal
// export function optimal(nums: number[], k: number): number {
//   const preSum = new Map<number, number>()
//   preSum.set(0, 1)
//   let res = 0
//   let sum0_i = 0
//   for (let i = 0; i < nums.length; i++) {
//     sum0_i += nums[i]
//     const sum0_j = sum0_i - k
//     if (preSum.has(sum0_j)) {
//       res += preSum.get(sum0_j)
//     }
//     preSum.set(sum0_i, (preSum.get(sum0_i) || 0) + 1 )
//   }
//   return res
// }
