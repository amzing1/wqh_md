function insertionSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[i] < arr[j]) {
        swap(arr, i, j);
      } else {
        break;
      }
    }
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
