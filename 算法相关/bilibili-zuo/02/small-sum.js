function mergeSort(array, l, r, sum) {
  if (l === r) {
    return;
  }
  const mid = l + ((r - l) >> 1);
  mergeSort(array, l, mid, sum);
  mergeSort(array, mid + 1, r, sum);
  merge(array, l, mid, r, sum);
}

function merge(array, l, m, r, sum) {
  const tempArr = new Array(r - l + 1);
  let p1 = l;
  let p2 = m + 1;
  let idx = 0;
  while (p1 <= m && p2 <= r) {
    sum.value += array[p1] < array[p2] ? (r - p2 + 1) * array[p1] : 0;
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
  let sum = { value: 0 };
  mergeSort(arr, l, r, sum);
  return sum;
}

const arr = [1, 3, 4, 2, 5];
console.log(solute(arr));
console.log(arr);
