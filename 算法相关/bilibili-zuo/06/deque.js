class Deque {
  constructor(arr) {
    this.origin = arr;
    this.deque = [];
  }

  push(idx, val) {
    if (this.deque.length === 0 || val < this.origin[this.deque[this.deque.length - 1]]) {
      this.deque.push(idx);
    } else {
      while (this.origin[this.deque[this.deque.length - 1]] <= val) {
        this.deque.pop();
      }
      this.deque.push(idx);
    }
  }

  pop(idx) {
    if (this.deque.length && this.deque[0] === idx) {
      this.deque.shift();
    }
  }

  getMax() {
    if (this.deque.length) {
      return this.origin[this.deque[0]];
    } else {
      throw Error('deque length is zero');
    }
  }

  getMin() {
    if (this.deque.length) {
      return this.origin[this.deque[this.deque.length - 1]];
    } else {
      throw Error('deque length is zero');
    }
  }
}

;
const arr = [1, 3, 5, 6, 3, 2, 10, 9, 7];
const deque = new Deque(arr);
arr.forEach((a, idx) => {
  deque.push(idx, a);
})
console.log(deque.deque);
console.log(deque.getMax(), deque.getMin());