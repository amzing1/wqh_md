function mergeSort(array, l, r) {
  if (l === r) {
    return;
  }
  const mid = l + ((r - l) >> 1);
  mergeSort(array, l, mid);
  mergeSort(array, mid + 1, r);
  merge(array, l, mid, r);
}

function merge(array, l, m, r) {
  const tempArr = new Array(r - l + 1);
  let p1 = l;
  let p2 = m + 1;
  let idx = 0;
  while (p1 <= m && p2 <= r) {
    tempArr[idx++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  while (p1 <= m) {
    tempArr[idx++] = array[p1++];
  }
  while (p2 <= r) {
    tempArr[idx++] = array[p2++];
  }
  for (let i = 0; i < tempArr.length; i++) {
    array[l + i] = tempArr[i];
  }
}

function solute(arr) {
  const l = 0;
  const r = arr.length - 1;
  mergeSort(arr, l, r);
}

const arr = [3, 5, 4, 2, 1, 8, 8, 10, 9, 7, 11];
solute(arr);
console.log(arr);
