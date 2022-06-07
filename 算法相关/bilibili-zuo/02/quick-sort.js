function swap2(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function partition(arr, l, r) {
  const target = arr[r];
  let cur = l;
  while (cur <= r) {
    if (arr[cur] === target) {
      cur++;
    } else if (arr[cur] < target) {
      swap2(arr, l, cur);
      l++;
      cur++;
    } else {
      swap2(arr, r, cur);
      r--;
    }
  }
  return [l, r];
}

function quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  let randomIdx = l + parseInt(Math.random() * (r - l));
  swap2(arr, randomIdx, r);
  const part = partition(arr, l, r);
  quickSort(arr, l, part[0] - 1);
  quickSort(arr, part[1] + 1, r);
}

const arr = [1, 3, 4, 2, 2, 4, 5, 6, 3];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
