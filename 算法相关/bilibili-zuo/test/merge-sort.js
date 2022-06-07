function mergeSort(arr) {
  process(arr, 0, arr.length - 1);
}

function process(arr, l, r) {
  if (l === r) {
    return;
  }
  const mid = Math.floor((l + r) / 2);
  process(arr, l, mid - 1);
  process(arr, mid, r);
  merge(arr, l, mid, r);
}

function merge(arr, l, mid, r) {
  const help = [];
  let p1 = l;
  let p2 = mid;
  let idx = 0;
  while (p1 < mid && p2 <= r) {
    help[idx++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }
  while (p1 < mid) {
    help[idx++] = arr[p1++];
  }
  while (p2 <= r) {
    help[idx++] = arr[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    arr[l + i] = help[i];
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
