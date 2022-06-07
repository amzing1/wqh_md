function selection(array) {
  if (array.length < 2 || !array) {
    return array;
  }
  for (let i = 0; i < array.length; i++) {
    let min = array[i];
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
        minIdx = j;
      }
    }
    swap(array, i, minIdx);
  }
  return array;
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

const arr = [3, 4, 2, 1, 8, 8, 10, 9, 7];
console.log(selection(arr));