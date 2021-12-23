/***
 * 使用乘法分配律进行大整数乘法
 * 3278 * 41926
 * 反正就是把10抽出去最后乘号两边变成10以内的乘法再乘以一个10的幂次方
 * 类似于 3 * 4 * 10**5
 */

//分解：
// eg: 345 => [3, 4, 2]
function resolve(str: string): string[] | string {
  if (str.length > 1) {
    const left = str.slice(0, 1);
    const right = str.slice(1);
    const zeroStr = new Array(str.length - 1).fill('0').join('');
    return [left, right, zeroStr];
  } else {
    return str;
  }
}
//若干个数字字符串按照加法规则相加
function addStrs(...strs: string[]): string {
  let strArr = new Array(strs.length);
  let maxLength = 0;
  for (let i = 0; i < strs.length; i++) {
    maxLength = strs[i].length > maxLength ? strs[i].length : maxLength;
    strArr[i] = strs[i].split('').reverse();
  }
  let index = 0;
  const ret: number[] = [];
  let jinwei = 0;
  while (index < maxLength) {
    let sum = 0;
    strArr.forEach(arr => {
      sum += index >= arr.length ? 0 : parseInt(arr[index]);
    });
    sum += jinwei;
    jinwei = Math.floor(sum / 10);
    ret.unshift(sum % 10);
    index++;
  }
  return ret.join('');
}

function mul(a: string, b: string): string {
  let resA = resolve(a);
  let aLeft: string;
  let aRight: string;
  let aZeroStr: string;
  let resB = resolve(b);
  let bLeft: string;
  let bRight: string;
  let bZeroStr: string;
  if (typeof resA === 'string') {
    a = resA;
    if (typeof resB === 'string') {
      b = resB;
      return (parseInt(a) * parseInt(b)).toString();
    } else {
      [bLeft, bRight, bZeroStr] = resB;
      return addStrs(mul(a, bLeft) + bZeroStr, mul(a, bRight));
    }
  } else {
    [aLeft, aRight, aZeroStr] = resA;
    if (typeof resB === 'string') {
      b = resB;
      return addStrs(mul(aLeft, b) + aZeroStr, mul(aRight, b));
    } else {
      [bLeft, bRight, bZeroStr] = resB;
      return addStrs(mul(aLeft, bLeft) + aZeroStr + bZeroStr, 
                    mul(aLeft, bRight) + aZeroStr, 
                    mul(aRight, bLeft) + bZeroStr, 
                    mul(aRight, bRight));
    }
  }
}

console.log(mul('1231435', '465933645'));