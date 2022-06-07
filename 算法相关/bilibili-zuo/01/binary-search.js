function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = parseInt((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

const arr = [1, 3, 4, 5, 6, 7];
console.log(binarySearch(arr, 3));
