// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

import { hasFindAll } from "./76";

// 换句话说，s1 的排列之一是 s2 的 子串 

export function checkInclusion(s1: string, s2: string): boolean {
  const ss1 = Array.from(s1).sort((a, b) => a > b ? 1 : -1).join('')
  const width = s1.length;
  for (let i = 0; i <= s2.length - width; i++) {
    let ss2 = s2.slice(i, i + width);
    ss2 = Array.from(ss2).sort((a, b) => a > b ? 1 : -1).join('')
    if (ss1 === ss2) {
      return true;
    }
  }
  return false;
};

export function checkInclusion2(s1: string, s2: string): boolean {
  const originMap = new Map<string, number>();
  for (let i = 0; i < s1.length; i++) {
    originMap.set(s1[i], (originMap.get(s1[i]) || 0) + 1)
  }
  let left = 0;
  let right = 0;
  let map = new Map(originMap)
  const width = s1.length;
  while (right < s2.length) {
    if (!map.has(s2[right])) {
      left++;
      right = left;
      map = new Map(originMap);
    } else {
      const newval = map.get(s2[right]) - 1;
      if (newval < 0) {
        left++;
        right = left;
        map = new Map(originMap);
      }
      map.set(s2[right], map.get(s2[right]) - 1);
      if (right < left + width - 1) {
        right++;
      } else {
        if (!hasFindAll) {
          left++;
          right = left;
          map = new Map(originMap);
        } else {
          return true;
        }
      }
    }
  }
  return false;

}