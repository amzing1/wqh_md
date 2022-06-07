function bubbing(array) {
  if (array.length < 2 || !array) {
    return;
  }
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j);
      }
    }
  }
  return array;
}

function swap(array, a, b) {
  if (!array || a === b) {
    throw Error('error params')
  }
  array[a] = array[a] ^ array[b];
  array[b] = array[a] ^ array[b];
  array[a] = array[a] ^ array[b];
}

const arr = [3, 4, 2, 1, 8, 8, 10, 9, 7];
console.log(bubbing(arr));