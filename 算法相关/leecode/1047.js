var removeDuplicates = function(s) {
    if(s.length<=1) return s;
    let arr = Array.from(s);
    let start = 0;
    while(start>=0 && start+1<arr.length) {
        if(arr[start]===arr[start+1]) {
            arr.splice(start,2);
            if(start>=1) {
                start--;
            }
        } else {
            start++;
        }
    }
    return arr.join('');
};

console.log(removeDuplicates("aaaaaaaa"))