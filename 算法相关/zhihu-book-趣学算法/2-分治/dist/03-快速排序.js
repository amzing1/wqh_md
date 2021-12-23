"use strict";
function quickSort(arr, left, right) {
    if (left < right) {
        let i = left;
        let j = right;
        let base = arr[left];
        while (i < j) {
            while (i < j && arr[j] > base) {
                j--;
            }
            if (i < j) {
                arr[i++] = arr[j];
            }
            while (i < j && arr[i] <= base) {
                i++;
            }
            if (i < j) {
                arr[j--] = arr[i];
            }
        }
        arr[i] = base;
        quickSort(arr, left, i - 1);
        quickSort(arr, i + 1, right);
    }
    return arr;
}
const qArr = [4, 3, 5, 2, 1];
console.log(quickSort(qArr, 0, qArr.length - 1));
