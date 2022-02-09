export function getModifiedArray(length: number, updates: [number, number, number][]): number[] {
  const arr = new Array(length).fill(0)
  const diffArr = new Array(length).fill(0)
  for (let i = 0, l = updates.length; i < l; i++) {
    const [start, end, inc] = updates[i]
    diffArr[start] += inc
    if (end < length - 1) {
      diffArr[end + 1] -= inc
    }
  }
  arr[0] = diffArr[0]
  for (let i = 1; i < length; i++) {
    arr[i] = arr[i - 1] + diffArr[i]
  }
  return arr
}