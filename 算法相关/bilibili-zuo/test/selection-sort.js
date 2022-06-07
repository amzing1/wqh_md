function selectionSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        minIdx = j;
      }
    }
    swap(arr, i, minIdx);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
