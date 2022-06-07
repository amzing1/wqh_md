function kmp(str1, str2) {
  if(!str1 || !str2 || str2.length > str1.length) {
    return -1;
  }
  const next = getNext(str2);
  let i1 = 0;
  let i2 = 0;
  while (i1 < str1.length && i2 < str2.length) {
    if (str1[i1] === str2[i2]) {
      i1++;
      i2++;
    } else if (i2 === 0) {
      i1++;
    } else {
      i2 = next[i2];
    }
  }
  return i2 === str2.length ? i1 - i2 : -1;
}

// 字符串每个字符的前一个子串的前缀和后缀相等的最大长度
function getNext(str) {
  if (!str || !str.length) {
    throw Error('str is not valid');
  }
  const pArr = [];
  pArr[0] = -1;
  pArr[1] = 0;
  let i = 2;
  let cn = 0;
  while (i < str.length) {
    if (str[i] === str[cn]) {
      pArr[i++] = ++cn;
    } else if (cn > 0) {
      pArr[i] = pArr[cn]; 
    } else {
      pArr[i++] = 0;
    }
  }
  return pArr;
}