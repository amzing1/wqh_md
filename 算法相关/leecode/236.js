// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。




var lowestCommonAncestor = function(root, p, q) {
    let map = new Map();
    let map2 = new Map();
    function dfs(node) {
        if(!node) return;
        if(node.left) {
            map.set(node.left.val, node.val);
        }
        if(node.right) {
            map.set(node.right.val, node.val);
        }
    }
    map.set(root.val, null);
    dfs(root);

    while(p) {
        map2.set(p.val, true);
        p = map.get(p.val);
    }

    while(q) {
        if(map2.get(q.val)) return q;
        q = map.get(q.val);
    }

    return null;



};