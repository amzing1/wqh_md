class MonoStack {
  constructor(arr) {
    this.origin = arr;
    this.monoStack = [];
    this.bigThanMap = new Map();
    this.init();
  }

  init() {
    for (let i = 0; i < this.origin.length; i++) {
      const top = this.monoStack[this.monoStack.length - 1];
      if (this.monoStack.length === 0 || this.origin[top[0]] > this.origin[i]) {
        this.monoStack.push([i]);
      } else if (top && this.origin[top[0]] === this.origin[i]) {
        top.push(i);
      }else {
        while (this.monoStack.length || this.monoStack[this.monoStack.length - 1] < this.origin[i]) {
          const cur = this.monoStack.pop();
          const rightBig = i;
          const leftBig = this.monoStack.length ? top[top.length - 1] : -1;
          for (let k = 0; k < cur.length; k++) {
            this.bigThanMap.set(cur[k], [leftBig, rightBig]);
          }
        }
        this.monoStack.push([i]);
      }
    }
    let prev = -1;
    while (this.monoStack.length) {
      const cur = this.monoStack.pop();
      const rightBig = prev;
      const top = this.monoStack[this.monoStack.length - 1];
      const leftBig = this.monoStack.length ? top[top.length - 1] : -1;
      for (let k = 0; k < cur.length; k++) {
        this.bigThanMap.set(cur[k], [leftBig, rightBig]);
      }
      prev = cur[0];
    }
  }

  getRes(idx) {
    return this.bigThanMap.get(idx);
  }
}

const arr = [1,4,2,5,5,5, 7,10,10,13,6,8];
const monoStack = new MonoStack(arr);
console.log(monoStack.getRes(3));