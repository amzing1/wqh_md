// 给定两个大小相等的数组 A 和 B，A 相对于 B 的优势可以用满足 A[i] > B[i] 的索引 i 的数目来描述。

// 返回 A 的任意排列，使其相对于 B 的优势最大化。

function swap(arr: number[], a: number, b: number) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function advantageCount(nums1: number[], nums2: number[]): number[] {
  const res: number[] = [];
  nums1.sort((a, b) => a - b)
  for (let i = 0, l = nums2.length; i < l; i++) {
    const index = nums1.findIndex(item => item > nums2[i]);
    res.push(index === -1 ? nums1[0] : nums1[index]);
    nums1.splice(index === -1 ? 0 : index);
  }
  return res;
};
