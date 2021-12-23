// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];
  for (let c of s) {
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c)
    } else {
      if (stack.length === 0) return false;
      const top = stack[stack.length - 1];
      if ((c == '}' && top == '{') || (c == ')' && top == '(') || (c == ']' && top == '[')) {
        stack.pop();
      }
      else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

function isValid(s) {
  let stack = [];
  for(let i=0;i<s.length;i++) {
    if(s[i]==='(' || s[i]==='{' || s[i]==='[') {
      stack.push(s[i])
    } else {
      if(stack.length===0) return false;
      let top = stack.pop();
      if((top==='{'&&s[i]!=='}') ||(top==='['&&s[i]!==']')||(top==='('&&s[i]!==')')) return false;
    }
  }
  return stack.length===0;
}