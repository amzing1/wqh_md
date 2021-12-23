// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 进阶：你能尝试使用一趟扫描实现吗？

//  

// 示例 1：


// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function dfs (node, n, count, isHead) {
  if (node.next) {
    dfs(node.next, n, count, false);
  }
  if (count.num === n) {
    if (isHead) {
      node.result = node.next;
    }
  }
  if (count.num === n + 1) {
    node.next = node.next.next;
  }
  count.num++;
}
var removeNthFromEnd = function (head, n) {
  let count = { num: 1 };
  dfs(head, n, count, true);
  return head.result !== undefined ? head.result : head;
};

function removeNthFromEnd(head, n) {
  let nodeArr = [];
  while(head) {
    nodeArr.push(head);
    head = head.next;
  }
  let frontIndex = nodeArr.length - n -1;
  if(frontIndex < 0) {
    return nodeArr[1] ? nodeArr[1] : null;
  } else {
    let frontNode = nodeArr[frontIndex];
    frontNode.next = frontNode.next.next;
  }
  return nodeArr[0];
  
}

function removeNthFromEnd(head, n) {
  let dummy_node = new ListNode(-1, head);
  let fast = dummy_node;
  let slow = dummy_node;
  for(let i=0; i<=n; i++) {
    fast = fast.next;
  }
  while(fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
}