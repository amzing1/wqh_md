// 有一个数组，其中只有一个数出现了奇数次，找到这个数
function findNumberAppearOdd(array) {
  let ers = 0;
  for (const num of array) {
    ers ^= num;
  }
  return ers;
}

const array = [3, 3, 3, 2, 2, 2, 2, 1, 1];
console.log(findNumberAppearOdd(array));

// 有一个数组，其中只有两个数出现了偶数次，找到这两个数
function findNumberAppearOdd2(array) {
  let ers = 0;
  for (const num of array) {
    ers ^= num;
  }
  let ers2 = ers;
  let rightOne = ers & (~ers + 1);
  for (const num of array) {
    if ((rightOne & num) === 0) {
      ers2 ^= num;
    }
  }
  return [ers2, ers2 ^ ers];
}

const array2 = [3, 3, 3, 2, 2, 2, 2, 1, 1, 4, 5, 5, 6, 6];
console.log(findNumberAppearOdd2(array2));
