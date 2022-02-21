export function hasFindAll(map: Map<string, number>) {
  let res = true;
  console.log(map);
  map.forEach((value) => {
    if (value > 0) {
      res = false;
    }
  });
  return res;
}
export function solute(s: string, t: string): string {
  const map = new Map<string, number>();
  for (let i = 0, l = t.length; i < l; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1);
  }

  let left = 0,
    right = 0;
  const length = s.length;
  let toRight = true;
  let minLen = Infinity;
  let minStr = "";
  while (right <= length) {
    if (toRight) {
      if (map.has(s[right])) {
        map.set(s[right], map.get(s[right]) - 1);
      }
      if (!hasFindAll(map)) {
        right++;
      } else {
        toRight = false;
        right++;
      }
    } else {
      if (map.has(s[left])) {
        const value = map.get(s[left]);
        if (value === 0) {
          const dis = right - left;
          if (dis < minLen) {
            minStr = s.slice(left, right);
            minLen = dis;
          }
          toRight = true;
        } else if (value < 0) {
          map.set(s[left], value + 1);
          left++;
        } else {
          throw Error("error");
        }
      } else {
        left++;
      }
    }
  }
  return minStr;
}
