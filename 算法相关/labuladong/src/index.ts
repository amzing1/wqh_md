import { ListNode, mergeTwoLists } from "../单链表/21";

const a1 = new ListNode(4, null)
const a2 = new ListNode(2, a1);
const list1 = new ListNode(1, a2);

const b1 = new ListNode(4, null);
const b2 = new ListNode(3, b1);
const list2 = new ListNode(1, b2);

const res = mergeTwoLists(list1, list2);
console.log(res);

