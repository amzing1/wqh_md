var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const sub = target - nums[i];
        if (map.has(nums[i])) {
            return [map.get(sub), i];
        } else {
            map.set(sub, i);
        }
    }
    console.log(map);
    return [];
};