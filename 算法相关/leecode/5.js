// 给你一个字符串 s，找到 s 中最长的回文子串。

//  

// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。


/**
 * @param {string} s
 * @return {string}
 */
function expand(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  left++;
  right--;
  return { left, right }
}
var longestPalindrome = function (s) {
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    let res1 = expand(s, i, i);
    let left1 = res1.left;
    let right1 = res1.right;
    let res2 = expand(s, i, i + 1);
    let left2 = res2.left;
    let right2 = res2.right;
    if (right1 - left1 > end - start) {
      start = left1;
      end = right1;
    }
    if (right2 - left2 > end - start) {
      start = left2;
      end = right2;
    }
  }
  return s.slice(start, end + 1);

};

function expand(s, left, right) {
  while(left>=0 && right<s.length && s[left]===s[right]) {
    left--;
    right++;
  }
  return {
    left: left+1,
    right: right-1
  }
}

function longestPalindrome(s) {
  let end = 0;
  let start = 0;
  for(let i=0; i<s.length; i++) {
    let res1 = expand(s, i, i);
    if(res1.right - res1.left > end - start) {
      start = res1.left;
      end = res1.right;
    }
    let res2 = expand(s, i, i+1);
    if(res2.right - res2.left > end - start) {
      start = res2.left;
      end = res2.right;
    }
  }
  return s.slice(start, end+1);
}