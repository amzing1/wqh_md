// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

//  

// 示例：

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/3sum-closest
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
    let min;
    let result;
    for(let first=0,l=nums.length;first<l;first++) {
        
        for(let second = first+1;second<l;second++) {
            let third = l-1;
            while(second < third) {
                let sub = Math.abs(nums[first]+nums[second]+nums[third]-target);
                if(min===undefined || sub < min) {
                    min = sub;
                    result = nums[first]+nums[second]+nums[third];
                    if(min===0) {
                        return target;
                    }
                }
                third--;
            }
        }
    }
    return result;
};

console.log(threeSumClosest([1, 2, 4, 8, 16, 32, 64, 128]
    , 82))