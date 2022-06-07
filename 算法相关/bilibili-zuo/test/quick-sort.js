function quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  const random = l + Math.floor(Math.random() * (r - l));
  swap(arr, random, r);
  const part = partition(arr, l, r);
  quickSort(arr, l, part[0] - 1);
  quickSort(arr, part[1] + 1, r);
}

function partition(arr, l, r) {
  let target = arr[r];
  let cur = l;
  while (cur <= r) {
    if (arr[cur] < target) {
      swap(arr, cur, l);
      cur++;
      l++;
    } else if (arr[cur] === target) {
      cur++;
    } else {
      swap(arr, cur, r);
      r--;
    }
  }
  return [l, r];
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [1, 3, 4, 2, 2, 4, 5, 6, 3];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
