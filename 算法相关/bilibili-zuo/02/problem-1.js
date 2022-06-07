function solute(arr, target) {
  let slow = 0;
  let fast = 0;
  while (fast < arr.length) {
    if (arr[fast] <= target) {
      swap(arr, fast, slow);
      slow++;
    }
    fast++;
  }
  return arr;
}

function solute2(arr, target) {
  let l = 0;
  let r = arr.length - 1;
  let cur = 0;
  while (cur <= r) {
    if (arr[cur] === target) {
      cur++;
    } else if (arr[cur] < target) {
      swap(arr, cur, l);
      l++;
      cur++;
    } else {
      swap(arr, cur, r);
      r--;
    }
  }
  return arr;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

const arr = [8, 2, 4, 3, 3, 5, 2, 1, 3, 3];
console.log(solute2(arr, 3));
