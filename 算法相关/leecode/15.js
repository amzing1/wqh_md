// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

//  

// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/3sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function (nums) {
    nums.sort(function(a, b) {
        return a-b
    });
    let allRes = [];
    const length = nums.length;
    for(let first=0; first<length; first++) {
        if(first>0 && nums[first] === nums[first-1]) {
            continue;
        }
        let third = length - 1;
        for(let second = first+1; second<length; second++) {
            if(second > first+1 && nums[second] === nums[second-1]) {
                continue;
            }
            while(second < third && nums[first]+nums[second]+nums[third] > 0) {
                --third;
            }
            if(second === third) break;
            if(nums[second] + nums[third] + nums[first] === 0) {
                allRes.push([nums[first],nums[second],nums[third]]);
            }
        }   
    }
    return allRes;
};

function threeSum(nums) {
    nums.sort((a,b)=>a-b);
    let allRes = [];
    for(let first=0; first<nums.length; first++) {
        if(first>0 && nums[first]===nums[first-1]) {
            continue;
        }
        
        for(let second=first+1; second<nums.length; second++) {
            if(second>first+1 && nums[second]===nums[second-1]) {
                continue;
            }
            let third = nums.length-1;
            while(true) {
                let sum = nums[first] + nums[second] + nums[third];
                if(third===second) break;
                if(sum===0) {
                    allRes.push([nums[first],nums[second],nums[third]]);
                    break;
                }
                else if(sum<0) break;
                else third--;
            }
        }
    }
    return allRes;
}

function threeSum(nums) {
    let res = [];
    let length = nums.length;
    nums.sort((a,b) => {return a-b});
    for(let first=0; first<length; first++) {
        if(first>0 && nums[first]===nums[first-1]) {
            continue;
        }
        for(let second=first+1; second<length; second++) {
            if(second>first+1 && nums[second]==nums[second-1]) {
                continue;
            }
            let third = length-1;
            while(true) {
                let sum = nums[first] + nums[second] + nums[third];
                if(third === second) break;
                if(sum === 0) {
                    res.push([nums[first],nums[second],nums[third]]);
                } else if(sum<0) {
                    break;
                } else {
                    third--;
                }
            }
        }
    }
    return res;
}