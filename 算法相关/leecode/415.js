// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = 1;
  let jinwei = 0;
  let result = num1.length > num2.length ? new Array(num1.length) : new Array(num2.length);
  while (num1[num1.length - i] || num2[num2.length - i]) {
    let a = num1.length - i >= 0 ? num1[num1.length - i] : 0;
    let b = num2.length - i >= 0 ? num2[num2.length - i] : 0;
    let res = parseInt(a) + parseInt(b) + jinwei;
    if (res >= 10) {
      jinwei = 1;
      res %= 10;
    } else {
      jinwei = 0;
    }
    result[result.length-i] = res;
    i++;
  }

  if (jinwei === 1) {
    result.unshift(1)
  }

  return result.join('');

};