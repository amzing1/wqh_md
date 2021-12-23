/**
 * @param {string} s
 * @return {boolean}
 */
function isHuiwen(s) {
    let left = 0;
    let right = s.length-1;
    while(left<=right) {
        if(s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
 var validPalindrome = function(s) {
    if(isHuiwen(s)) return true;
    let start = 0;
    let end = s.length-1;
    
    while(start <= end) {
        if(s[start] === s[end]) {
            start++;
            end--;
        } else {
            let s1 = s.slice(start+1, end+1);
            let s2 = s.slice(start, end);
            return isHuiwen(s1) || isHuiwen(s2);
        }
    }

    return true;
};