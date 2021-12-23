function isNumberOrChar(c) {
    if(c>='a'&& c<='z' || c>='A'&&c<='Z' || !isNaN(parseInt(c))) {
        return true;
    }
    return false;
}
var isPalindrome = function(s) {
    if(s.length===0) return true;
    let left = 0;
    let right = s.length - 1;
    while(left <= right) {
        if(!isNumberOrChar(s[left])) {
            left++;
        }
        if(!isNumberOrChar(s[right])) {
            right--;
        }
        if(isNumberOrChar(s[left]) && isNumberOrChar(s[right])) {
            if(s[left].toLowerCase() !== s[right].toLowerCase()) {
                return false;
            }
            left++;
            right--;
        }
    }
    return true;
};

console.log(isPalindrome("ab_a"))