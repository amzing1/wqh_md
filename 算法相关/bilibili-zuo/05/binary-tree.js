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
morris(root);

/*** 递归方式 */
function preOrderTraversal(root) {
  if (!root) {
    return;
  }
  console.log(root.value);
  preorderTraversal(root.left);
  preorderTraversal(root.right);
}

function inOrderTraversal(root) {
  if (!root) {
    return;
  }
  inOrderTraversal(root.left);
  console.log(root.value);
  inOrderTraversal(root.right);
}

function postOrderTraversal(root) {
  if (!root) {
    return;
  }
  postOrderTraversal(root.left);
  postOrderTraversal(root.right);
  console.log(root.value);
}

/*** 非递归方式 */
function preOrderTraversal2(root) {
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

function inOrderTraversal2(root) {
  const stack = [];
  let cur = root;
  stack.push(cur);
  while (stack.length) {
    if (cur.left) {
      stack.push(cur.left);
      cur = cur.left;
    } else {
      cur = stack.pop();
      console.log(cur.value);
      if (cur.right) {
        stack.push(cur.right);
        cur = cur.right;
      }
    }
  }
}

function postOrderTraversal2(root) {
  const stack = [];
  const help = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    help.push(cur);
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }
  while (help.length) {
    console.log(help.pop().value);
  }
}

/*** 层次遍历 */
function widthTraversel(root) {
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const cur = queue.shift();
    console.log(cur.value);
    if (cur.left) {
      queue.push(cur.left);
    }
    if (cur.right) {
      queue.push(cur.right);
    }
  }
}

/*** Morris遍历，空间复杂度为 O(1) */
function morris(root) {
  if (!root) {
    return;
  }
  let cur = root;
  let mostRight = null;
  while (cur) {
    // 如果有左子树，就找到左子树的最右节点，让最右节点指向cur
    mostRight = cur.left;
    if (mostRight) {
      while (mostRight.right !== null && mostRight.right !== cur) {
        mostRight = mostRight.right;
      }
      if (mostRight.right === null) {
        console.log(cur.value);
        mostRight.right = cur;
        cur = cur.left;
        continue;
      } else {
        mostRight.right = null;
      }
    } else {
      console.log(cur.value);
    }
    cur = cur.right;
  }
}

/** 判断是否是完全二叉树 */
function isCBT(root) {
  const queue = [];
  queue.push(root);
  let shouldBeLeaf = false;
  while (queue.length) {
    const cur = queue.shift();
    if (cur.right && !cur.left) {
      return false;
    }
    if (shouldBeLeaf && (cur.left || cur.right)) {
      return false;
    }
    if (cur.left) {
      queue.push(cur.left);
    }
    if (cur.right) {
      queue.push(cur.right);
    }
    if (cur.left && !cur.right) {
      shouldBeLeaf = true;
    }
  }
  return true;
}
