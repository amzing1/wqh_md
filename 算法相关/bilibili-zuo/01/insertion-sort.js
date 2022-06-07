function insertion(array) {
  if (!array || array.length < 2) {
    return array;
  }
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1);
    }
  }
  return array;
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}


const arr = [3, 4, 2, 1, 8, 8, 10, 9, 7];
console.log(insertion(arr));