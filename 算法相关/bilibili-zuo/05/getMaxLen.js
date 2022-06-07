class Node {
  constructor(val = null, left = null, right = null) {
    this.value = val;
    this.left = left;
    this.right = right;
  }
}

// 构建一棵二叉树
const array = [1, 2, 3, 4, 5, 6, 7];
const nodeArr = [];
array.forEach((a) => {
  nodeArr.push(new Node(a));
});
nodeArr[0].left = nodeArr[1];
nodeArr[0].right = nodeArr[2];
nodeArr[1].left = nodeArr[3];
nodeArr[1].right = nodeArr[4];
nodeArr[2].left = nodeArr[5];
nodeArr[2].right = nodeArr[6];

const root = nodeArr[0];

function getMaxLen(root) {}
