class Deque {
  constructor(arr) {
    this.origin = arr;
    this.deque = [];
  }

  push(idx, val) {
    if (this.deque.length === 0 || val > this.origin[this.deque[this.deque.length - 1]]) {
      this.deque.push(idx);
    } else {
      while (this.deque.length || val <= this.origin[this.deque[this.deque.length - 1]]) {
        this.deque.pop();
      }
      this.deque.push(idx)
    }
  }

  pop(idx) {
    if (this.deque.length && this.deque[0] === idx) {
      this.deque.shift();
    }
  }

  getMax() {
    return this.origin[this.deque[0]];
  }

  getMin() {
    return this.origin[this.deque[this.deque.length - 1]];
  }
}