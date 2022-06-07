function solute(array) {
  let l = 0;
  let r = array.length - 1;
  return mergeSort(arr, l, r);
}

function mergeSort(arr, l, r) {
  if (l === r) {
    return 0;
  }
  const m = l + ((r - l) >> 1);
  return mergeSort(arr, l, m) + mergeSort(arr, m + 1, r) + merge(arr, l, m, r);
}

function merge(arr, l, m, r) {
  const help = new Array(r - l + 1);
  let idx = 0;
  let p1 = l;
  let p2 = m + 1;
  let sum = 0;
  while (p1 <= m && p2 <= r) {
    sum += arr[p1] > arr[p2] ? m - p1 + 1 : 0;
    help[idx++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
  }
  while (p1 <= m) {
    help[idx++] = arr[p1++];
  }
  while (p2 <= r) {
    help[idx++] = arr[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    arr[l + i] = help[i];
  }
  return sum;
}

const arr = [1, 3, 5, 2, 2, 1];
console.log(solute(arr));
console.log(arr);
