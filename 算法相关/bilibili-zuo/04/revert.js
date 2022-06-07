class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

const array = [1, 2, 3, 4, 5];
const head = new Node(null, null);
let cur = head;
array.forEach((a) => {
  cur.next = new Node(a);
  cur = cur.next;
});

function revert(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  console.log(prev);
}

revert(head);
