var addTwoNumbers = function(l1, l2) {
    let head, tail;
    let carry = 0;
    while (l1 || l2) {
        const a = l1 ? l1.val : 0;
        const b = l2 ? l2.val : 0;
        let sum = a + b + carry;
        if (sum >= 10) {
            carry = Math.floor(sum / 10);
            sum = sum % 10;
        } else {
            carry = 0;
        }
        if (!head) {
            head = tail = new ListNode(sum);
        } else {
            tail.next = new ListNode(sum);
        }
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    return head;
};