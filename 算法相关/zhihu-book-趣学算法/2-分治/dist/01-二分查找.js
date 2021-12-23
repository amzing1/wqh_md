"use strict";
/**
 * 给定n个元素，这些元素时有序的（假定为升序）
 * 从中查找特定元素x
 */
function search(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = (left + right) / 2;
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1;
}
const array = [1, 2, 3, 5, 6, 7];
console.log(search(array, 4));
