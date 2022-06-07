function manacher(str) {
  str = addCharp(str);
  let c = -1;
  let r = -1;
  let max = 0;
  const pArr = new Array(str.length).fill(0);
  for (let i = 0; i < str.length; i++) {
    pArr[i] = r > i ? Math.min(pArr[c - (i - c)], r - i) : 1;

    while (i - pArr[i] >= 0 && i + pArr[i] < str.length) {
      if (str[i + pArr[i]] === str[i - pArr[i]]) {
        pArr[i]++;
      } else {
        break;
      }
    }

    if (i + pArr[i] > r) {
      r = i + pArr[i];
      c = i;
    }

    max = Math.max(max, pArr[i]);
  }

  return max - 1;

}

function addCharp(str) {
  let res = '#';
  for (let i = 0; i < str.lenght; i++) {
    res += str[i] + '#';
  }
  return res;
}