class BigRootHeap {
  constructor(array) {
    this.heapSize = 0;
    this.heap = array;
  }
  swap(idx1, idx2) {
    let temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  }
  heapInsert(idx, value) {
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && value > this.heap[parentIdx]) {
      this.swap(parentIdx, idx);
      idx = parentIdx;
      parentIdx = Math.floor((parentIdx - 1) / 2);
    }
    this.heapSize++;
  }
  heapify(idx, value) {
    if (idx < 0 || idx >= this.heapSize) {
      return;
    }
    this.heap[idx] = value;
    let parentIdx = Math.floor((idx - 1) / 2);
    let curIdx = idx;
    while (parentIdx >= 0 && this.heap[parentIdx] < value) {
      this.swap(parentIdx, curIdx);
      curIdx = parentIdx;
      parentIdx = Math.floor((parentIdx - 1) / 2);
    }
    let leftChildIdx = idx * 2 + 1;
    let rightChildIdx = idx * 2 + 2;
    curIdx = idx;
    while (leftChildIdx <= this.heapSize) {
      let max = this.heap[leftChildIdx];
      let maxIdx = leftChildIdx;
      if (
        rightChildIdx <= this.heapSize &&
        this.heap[rightChildIdx] > this.heap[leftChildIdx]
      ) {
        max = this.heap[rightChildIdx];
        maxIdx = rightChildIdx;
      }
      if (max > value) {
        this.swap(maxIdx, curIdx);
        curIdx = maxIdx;
        leftChildIdx = maxIdx * 2 + 1;
        rightChildIdx = maxIdx * 2 + 2;
      } else {
        break;
      }
    }
  }
}

const arr = [1, 2, 3, 4, 8, 7, 6, 5];
const heap = new BigRootHeap(arr);

arr.forEach((a, idx) => heap.heapInsert(idx, a));

heap.heapify(4, 10);
console.log(heap.heap);
