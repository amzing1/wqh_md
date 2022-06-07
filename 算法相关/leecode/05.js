function palindrome(s, index) {
    let l = index - 1;
    let r = index + 1;
    let len = 1;
    let str = s[index];
    while(l >= 0 && r < s.length && s[l] === s[r]) {
        len += 2;
        str = s[l] + str + s[r];
        l--;
        r++;
    }
    return {
        len,
        str
    };
}
var longestPalindrome = function(s) {
    let max = 0;
    let ret = '';
    for (let i = 0; i < s.length; i++) {
        const { len, str } = palindrome(s, i);
        console.log(len, str);
        if (len > max) {
            max = len;
            ret = str;
        }
    }
    return ret;
};

console.log(longestPalindrome('babad'));