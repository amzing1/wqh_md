// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

//  

// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

var lengthOfLongestSubstring = function (s) {
  let max = '';
  let temp = '';
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (temp.includes(s[i])) {
      if (temp.length > max.length) {
        max = temp;
      }
      temp = '';
      i = start++;

    } else {
      temp += s[i];
    }
  }

  return temp.length > max.length ? temp.length : max.length;
};

function lengthOfLongestSubstring(s) {
  let start = 0;
  let temp = '';
  let max = 0;
  for(let i=0; i<s.length; i++) {
    if(temp.includes(s[i])) {
      if(temp.length > max) {
        max = temp.length;
      }
      temp = '';
      i = start++;
    } else {
      temp+=s[i];
    }
  }
  return temp.length > max ? temp.length : max;
}