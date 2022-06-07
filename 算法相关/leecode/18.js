/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var fourSum = function(nums, target) {
  const length = nums.length;
  if (length < 4) {
      return [];
  }
  nums.sort((a, b) => a - b);
  const ret = [];
  const map = new Map();
  for (let i = 0; i < length; i++) {
      if (map.has(nums[i])) {
          const value = map.get(nums[i]);
          value.forEach(v => {
            if (v.length === 3) {
              ret.push([...v, nums[i]])
            } else if (v.length < 3) {
              const newVal = [...v, nums[i]];
              if (map.has(0)) {
                const zeroV = map.get(0);
                zeroV.push(newVal);
                map.set(0, zeroV);
              } else {
                map.set(0, [newVal]);
              }
            }
          })
         
      } else {
          const toAdd = [];
          map.forEach((v, k) => {
            v.forEach((value) => {
              if (value.length < 3) {
                const v2 = [...value, nums[i]];
                const key = k - nums[i];
                toAdd.push([key, v2]);
              }
            })  
          })
          if (map.has(target - nums[i])) {
            const val = map.get(target - nums[i]);
            val.push([nums[i]]);
            map.set(target - nums[i], val);
          } else {
            map.set(target - nums[i], [[nums[i]]]);
          }
          toAdd.forEach(item => {
            if (map.has(item[0])) {
              const val = map.get(item[0]);
              val.push(item[1]);
              map.set(item[0], val);
            } else {
              map.set(item[0], [item[1]]);
            }
          })
      }
  }
  return ret;
};

let nums = [1, 0, -1, 0, -2, 2];
console.log(fourSum(nums, 0));
