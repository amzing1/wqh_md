// 给你单链表的头指针 head 和两个整数 left 和 right ，
// 其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，
// 返回 反转后的链表 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

var reverseBetween = function (head, left, right) {
    let dummy_node = new ListNode(-1, head);
    let prev = dummy_node;
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }
    let cur = prev.next;
    for (let i = left; i < right; i++) {
        let next = cur.next;
        cur.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    return dummy_node.next;
};

var reverseBetween = function(head, left, right) {
    let dummy_node = new ListNode(-1, head);
    let prev = dummy_node;
    for(let i=0;i<left-1;i++) {
        prev = prev.next;
    }
    let cur = prev.next;
    for(let i=left; i<right; i++) {
        let next = cur.next;
        cur.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    return dummy_node.next;
}