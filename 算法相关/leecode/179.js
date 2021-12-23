// 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

// 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。

var largestNumber = function(nums) {
    console.log(nums);
    nums = nums.sort((a,b)=> {
        a = a.toString();
        b = b.toString();
        let ab = a + b;
        let ba = b + a;
        console.log(ba-ab);
        return ba-ab;
    });
    console.log(nums);
    return nums.join('');
};

nums = [8,30,34,5,9];
console.log(largestNumber(nums));