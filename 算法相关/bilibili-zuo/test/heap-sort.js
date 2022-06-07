class Heap {
  constructor(arr) {
    this.heap = arr;
    this.heapSize = 0;
  }

  heapInsert(idx, value) {
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && value > this.heap[parentIdx]) {
      this.swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = Math.floor((parentIdx - 1) / 2);
    }
    this.heapSize++;
  }

  heapify(idx) {
    let left = idx * 2 + 1;
    while (left < this.heapSize) {
      let maxIdx =
        left + 1 < this.heapSize && this.heap[left] < this.heap[left + 1]
          ? left + 1
          : left;
      if (this.heap[maxIdx] > this.heap[idx]) {
        this.swap(maxIdx, idx);
        idx = maxIdx;
        left = maxIdx * 2 + 1;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

function heapSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  const heap = new Heap(arr);
  arr.forEach((a, idx) => heap.heapInsert(idx, a));
  while (heap.heapSize) {
    heap.swap(--heap.heapSize, 0);
    heap.heapify(0);
  }
}

const array = [3, 1, 2, 4, 5, 6, 2, 4, 9];
heapSort(array);
console.log(array);
