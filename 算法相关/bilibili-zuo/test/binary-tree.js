class TreeNode {
  constructor(value = -1, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function preOrderTraver(root) {
  if (!root) {
    return;
  }
  // console.log(root.value);
  preOrderTraver(root.left);
  console.log(root.value);
  preOrderTraver(root.right);
  // console.log(root.value);
}

function preOrderTraver2(root) {
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    console.log(cur.value);
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
  }
}
function postOrderTraversal2(root) {
  const help = [];
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
    help.push(cur);
  }
  while (help.length) {
    console.log(help.pop().value);
  }
}
function inOrderTraver2(root) {
  const stack = [];
  stack.push(root);
  let cur = root;
  while (stack.length) {
    if (cur.left) {
      stack.push(cur.left);
      cur = cur.left;
    } else {
      let temp = stack.pop();
      console.log(temp.value);
      if (temp.right) {
        stack.push(temp.right);
        cur = temp.right;
      }
    }
  }
}

// 构建一棵二叉树
const array = [1, 2, 3, 4, 5, 6, 7];
const nodeArr = [];
array.forEach((a) => {
  nodeArr.push(new TreeNode(a));
});
nodeArr[0].left = nodeArr[1];
nodeArr[0].right = nodeArr[2];
nodeArr[1].left = nodeArr[3];
nodeArr[1].right = nodeArr[4];
nodeArr[2].left = nodeArr[5];
nodeArr[2].right = nodeArr[6];

const root = nodeArr[0];

preOrderTraver(root);
inOrderTraver2(root);
