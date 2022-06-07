class TreeNode {
  constructor(value = -1, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const nodeArr = [];
arr.forEach((a) => {
  nodeArr.push(new TreeNode(a));
});
nodeArr[0].left = nodeArr[1];
nodeArr[0].right = nodeArr[2];
nodeArr[1].right = nodeArr[3];
nodeArr[2].left = nodeArr[4];
nodeArr[2].right = nodeArr[5];
nodeArr[3].left = nodeArr[6];
nodeArr[3].right = nodeArr[7];
nodeArr[4].left = nodeArr[8];
nodeArr[4].right = nodeArr[9];
nodeArr[7].right = nodeArr[10];
nodeArr[8].left = nodeArr[11];
nodeArr[10].left = nodeArr[12];
nodeArr[10].right = nodeArr[13];
nodeArr[11].left = nodeArr[14];
nodeArr[11].right = nodeArr[15];
const root = nodeArr[0];

printEdge1(root);

function printEdge1(node) {
  if (!node) {
    return;
  }
  const height = getHeight(node, 0);
  const edgeMap = new Array(height).fill(0).map(() => new Array(2).fill(null));
  setEdgeMap(node, 0, edgeMap);
  for (let i = 0; i < edgeMap.length; i++) {
    console.log(edgeMap[i][0].value);
  }
  printLeafNotInMap(node, 0, edgeMap);
  for (let i = edgeMap.length - 1; i > 0; i--) {
    console.log(edgeMap[i][1].value);
  }
}

function getHeight(node, l) {
  if (!node) {
    return l;
  }
  return Math.max(getHeight(node.left, l + 1), getHeight(node.right, l + 1));
}

function setEdgeMap(node, l, edgeMap) {
  if (!node) {
    return;
  }
  edgeMap[l][0] = edgeMap[l][0] === null ? node : edgeMap[l][0];
  edgeMap[l][1] = node;
  setEdgeMap(node.left, l + 1, edgeMap);
  setEdgeMap(node.right, l + 1, edgeMap);
}

function printLeafNotInMap(node, l, map) {
  if (!node) {
    return;
  }
  if (!node.left && !node.right && node !== map[l][0] && node !== map[l][1]) {
    console.log(node.value + " ");
  }
  printLeafNotInMap(node.left, l + 1, map);
  printLeafNotInMap(node.right, l + 1, map);
}
