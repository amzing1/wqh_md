### 二叉树

遇到一道二叉树的题目的通常思考过程：

1. 是否可以通过遍历一遍二叉树得到答案？如果可以，用一个 traverse 函数配合外部变量来实现。
2. 是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，充分利用这个函数的返回值。
3. 无论使用哪一种思维模式，你都要明白二叉树的没一个节点需要做什么，需要在什么时候（前中后序）做。

###  二叉搜索树

1. 判断是不是一个合法的二叉搜索树

```js
function isValidBST(root) {
    return isValid(root, null, null);
}
function isValid(root, min, max) {
    if (!root) {
        return true;
    }
    if (min && root.val <= min) return false;
    if (max && root.val >= max) return false;
    return isValid(root.left, min, root) && isValid(root.right, root, max);
}
```

2. 在二叉搜索树中查找元素

```js
function searchBST(root, target) {
    if (!root) {
        return null;
    }
    if (root.val > target) {
        return searchBST(root.left, target);
    }
    if (root.val < target) {
        return searchBST(root.right, target);
    }
    return root;
}
```

3. 在二叉搜索树中插入一个数

```js
function inesertBST(root, val) {
    if (!root) {
        return new TreeNode(val);
    }
    if (root.val > val) {
        insertBST(root.left, val);
    }
    if (root.val < val) {
        insertBST(root.right, val);
    }
    return root;
}
```

4. 在二叉搜索树中删除一个元素

```js
function deleteNode(root, key) {
    if (!root) return null;
    if (root.val === key) {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        const minNode = getMin(root.right);
        root.right = deleteNode(root.right, minNode.val);
        minNode.left = root.left;
        minNode.right = root.right;
        root = minNode;
        return root;
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else {
        root.right = deleteNode(root.right, key);
    }
    return root;
}

function getMin(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}
```

