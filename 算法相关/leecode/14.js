// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

//  

// 示例 1：

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-common-prefix
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  let index = 0;
  let flag = false;
  while (true) {
    if (flag) break;
    let c = strs[0][index];
    for (let i = 0; i < strs.length; i++) {
      if (strs[i].length <= index || strs[i][index] !== c) {
        flag = true;
        break;
      }
    }
    index++;
  }
  return strs[0].slice(0, --index);

};

function longestCommonPrefix(strs) {
  if(strs.length===0) return '';
  let index = 0;
  let res = '';
  while(index < strs[0].length) {
    let c = strs[0][index];
    for(let i=0; i<strs.length; i++) {
      if(index >= strs[i].length || strs[i][index] !== c) {
        return res;
      }
    }
    res += c;
    index++;
  }
  return res;
}