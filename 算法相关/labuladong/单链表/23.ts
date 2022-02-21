// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

import { ListNode } from "./21";

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const res = new ListNode(0, null);
  const heads: ListNode[] = [];
  for (let i = 0, l = lists.length; i < l; i++) {
    heads.push(lists[i]);
  }
  
};