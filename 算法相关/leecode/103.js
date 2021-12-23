var zigzagLevelOrder = function(root) {
    let results = [];
    function dfs(node,deep) {
        if(!node) return;
        if(deep>=results.length) {
            results.push([node.val]);
        } else {
            if(deep%2===0) {
                results[deep].push(node.val);
            } else {
                results[deep].unshift(node.val);
            }
        }
        if(node.left) dfs(node.left, deep+1);
        if(node.right) dfs(node.right, deep+1);
    }
    dfs(root,0);
    return results;
};

function zigzagLevelOrder(root) {
    let res = [];
    function dfs(node, deep) {
        if(!node) return;
        if(deep%2===0) {
            if(res.length <= deep) {
                res.push([node.val]);
            } else {
                res.push(node.val);
            }
        } else {
            if(res.length <= deep) {
                res.push([node.val])
            } else {
                res.unshift(nove.val);
            }
        }
        if(node.left) dfs(node.left, deep+1);
        if(node.right) dfs(node.right, deep+1);
    }
    dfs(root, 0);
    return res;
}