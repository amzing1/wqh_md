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

  heapify(idx) {
    let left = idx * 2 + 1;
    while (left < this.heapSize) {
      let largest =
        left + 1 < this.heapSize && this.heap[left + 1] > this.heap[left]
          ? left + 1
          : left;
      largest = this.heap[largest] > this.heap[idx] ? largest : idx;
      if (largest === idx) {
        break;
      }
      this.swap(largest, idx);
      idx = largest;
      left = idx * 2 + 1;
    }
  }
}

function heapSort(array) {
  if (!array || array.length < 2) {
    return array;
  }
  const heap = new BigRootHeap(array);
  array.forEach((a, idx) => heap.heapInsert(idx, a));
  while (heap.heapSize > 0) {
    heap.swap(0, --heap.heapSize);
    heap.heapify(0);
  }
  return heap.heap;
}

const array = [3, 1, 2, 4, 5, 6, 2, 4, 9];
