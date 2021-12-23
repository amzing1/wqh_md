// 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
// 每条从根节点到叶节点的路径都代表一个数字：

// 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
// 计算从根节点到叶节点生成的 所有数字之和 。

// 叶节点 是指没有子节点的节点。

//  

// 示例 1：


// 输入：root = [1,2,3]
// 输出：25
// 解释：
// 从根到叶子节点路径 1->2 代表数字 12
// 从根到叶子节点路径 1->3 代表数字 13
// 因此，数字总和 = 12 + 13 = 25

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

function dfs (node, result, str) {
  str += node.val;
  if (node.left) {
    dfs(node.left, result, str);
  }
  if (node.right) {
    dfs(node.right, result, str);
  }
  if (!node.left && !node.right) {
    result.push(str);
    str.slice(0, str.length - 1);
  }
}

var sumNumbers = function (root) {
  let str = '';
  let result = [];
  dfs(root, result, str);

  return result.reduce((prev, next) => {
    return parseInt(prev) + parseInt(next)
  }, 0)
};


function sumNumbers(root) {
  let sum = 0;
  function dfs(node, str) {
    if(!node) return;
    str += node.val;
    if(node.left) dfs(node.left, str);
    if(node.right) dfs(node.right, str);
    if(!node.left && !node.right) {
      sum+=parseInt(str);
    }
  }
  dfs(root, '');
  return sum;
}