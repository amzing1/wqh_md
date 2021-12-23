var minDepth = function(root) {

    let min;
    function dfs(node, deep) {
        if(!node.val) return;
        if(node.left) {
            dfs(node.left, deep+1);
        }
        if(node.right) {
            dfs(node.right, deep+1);
        }
        if(!node.left && !node.right) {
            if(min===undefined || deep<min) {
                min = deep;
            }
        }
    }
    dfs(root, 1);
    return min;
};

function minDepth(root) {
    let min;

    function dfs(node,deep) {
        if(!node) return;
        if(node.left) dfs(node.left, deep+1);
        if(node.right) dfs(node.right, deep+1);
        if(!node.left && !node.right) {
            if(min===undefined || deep<min) {
                min = deep;
            }
        }
    }

    dfs(root, 1);
    return min;

}