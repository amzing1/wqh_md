// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

import { hasFindAll } from "./76";

export function findAnagrams(s: string, p: string): number[] {
  const originMap = new Map<string, number>();
  for (let i = 0; i < p.length; i++) {
    originMap.set(p[i], (originMap.get(p[i]) || 0) + 1)
  }
  let left = 0;
  let right = 0;
  let map = new Map(originMap)
  const width = p.length;
  const res: number[] = [];
  let mapHasChange = false;
  while (right < s.length) {
    if (!map.has(s[right])) {
      left++;
      right = left;
      if(mapHasChange) {
        map = new Map(originMap);
        mapHasChange = false;
      }
        
    } else {
      const newval = map.get(s[right]) - 1;
      if (newval < 0) {
        left++;
        right = left;
        if(mapHasChange) {
          map = new Map(originMap);
          mapHasChange = false;
        }
      }
      map.set(s[right], map.get(s[right]) - 1);
      mapHasChange = true;
      if (right < left + width - 1) {
        right++;
      } else {
        if (hasFindAll) {
          res.push(left)
        } 
        left++;
        right = left;
        map = new Map(originMap);
        mapHasChange = false;
      }
    }
  }
  return res;
};