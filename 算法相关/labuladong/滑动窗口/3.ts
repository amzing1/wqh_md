// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

export function lengthOfLongestSubstring(s: string): number {
  let left = 0;
  let right = 0;
  const map = new Map<string, number>();
  const length = s.length;
  let str = '';
  let max = 0;
  let curLen = 0;
  while (right < length) {
    if (map.has(s[right])) {
      map.delete(s[left]);
      left++;
      curLen--;
      str = str.slice(1, str.length);
    } else {
      str += s[right];
      map.set(s[right], 1);
      curLen++;
      right++;
      if (curLen > max) {
        max = curLen
      }
    }
  }
  return max;
};