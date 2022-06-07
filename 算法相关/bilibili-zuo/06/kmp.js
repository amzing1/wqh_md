// 验证str1中是否包含str2
function kmp(str1, str2) {
  if (str1.length < str2.length) {
    return -1;
  }
  let i1 = 0;
  let i2 = 0;
  const nexts = getNext(str2);
  console.log(nexts);
  while (i1 < str1.length && i2 < str2.length) {
    if (str1[i1] === str2[i2]) {
      i1++;
      i2++;
    } else if (i2 === 0) {
      i1++;
    } else {
      i2 = nexts[i2];
    }
  }

  return i2 === str2.length ? i1 - i2 : -1;
}

// 每个字符的前面的字符串的最长前缀和后缀匹配的最大长度
function getNext(str) {
  if (!str || !str.length) {
    return [-1];
  }
  const nexts = [];
  nexts[0] = -1;
  nexts[1] = 0;
  let i = 2;
  let cn = 0;
  while (i < str.length) {
    if (str[cn] === str[i]) {
      nexts[i++] = ++cn;
    } else if (cn > 0) {
      cn = nexts[cn];
    } else {
      nexts[i++] = 0
    }
  }
  return nexts;
}

const str1 = 'abdfdfgsdfsdagsdgsfgadkasdjsdkfdfgjnkdfgsjkdfgjkfsd';
const str2 = 'fgadkasdjsdkfdfgjnkdfgsjkdfgjk';
console.log(kmp(str1, str2));