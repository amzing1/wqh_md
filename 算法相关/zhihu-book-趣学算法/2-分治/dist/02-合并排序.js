"use strict";
function sortHebing(arr) {
    function fenjie(arr) {
        function sort(a, b) {
            const ret = [];
            let i = 0, j = 0;
            while (i < a.length || j < b.length) {
                if (j >= b.length || a[i] < b[j]) {
                    ret.push(a[i]);
                    i++;
                }
                else if (i >= a.length || a[i] >= b[j]) {
                    ret.push(b[j]);
                    j++;
                }
            }
            return ret;
        }
        let left = arr.splice(0, arr.length / 2);
        if (left.length > 1) {
            left = fenjie(left);
        }
        let right = arr;
        if (right.length > 1) {
            right = fenjie(right);
        }
        return sort(left, right);
    }
    return fenjie(arr);
}
const arr2 = [42, 15, 20, 6, 8, 38, 50, 12];
console.log(sortHebing(arr2));
