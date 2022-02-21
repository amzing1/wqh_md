// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }
}


export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
if (!list1 && !list2) return null;
if (!list1) return list2;
if (!list2) return list1;
let head1 = list1;
let head2 = list2;
let head = new ListNode(0, null);
const res = head;
while (head1 && head2) {
  if (head1.val < head2.val) {
    head.next = head1;
    head1 = head1.next;
  } else {
    head.next = head2;
    head2 = head2.next;
  }
  head = head.next;
}
if (head1) {
  head.next = head1;
}
if (head2) {
  head.next = head2;
}
return res.next;
};