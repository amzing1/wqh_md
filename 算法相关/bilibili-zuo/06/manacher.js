// 获得最长回文子串

function manacher(str) {
  if (!str || !str.length) {
    return 0;
  }
  // 添加特殊字符防止虚轴
  str = addCharp(str);
  console.log(str);
  let r = -1;
  let c = -1;
  let max = 0;
  // 回文半径数组
  const huiwenArr = new Array(str.length).fill(0);
  for (let i = 0; i < str.length; i++) {
    // i至少的回文区域
    huiwenArr[i] = r > i ? Math.min(huiwenArr[c - (i - c)], r - i) : 1;

    // 扩大回文数组
    while (i + huiwenArr[i] < str.length && i - huiwenArr[i] >= 0) {
      if (str[i + huiwenArr[i]] === str[i - huiwenArr[i]]) {
        huiwenArr[i]++;
      } else {
        break;
      }
    }

    // 更新r, c
    if (i + huiwenArr[i] > r) {
      r = i + huiwenArr[i];
      c = i;
    }

    max = Math.max(max, huiwenArr[i]);
  }
  return max - 1;
}

function addCharp(str) {
  let res = "#";
  for (let i = 0; i < str.length; i++) {
    res += str[i] + "#";
  }
  return res;
}

const str = "abcbd";
console.log(manacher(str));
