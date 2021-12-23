var mirrorTree = function(root) {

    function dfs(node) {
        if(!node) return;
        let temp = node.left;
        node.left = node.right;
        node.right = temp;
        if(node.left) {
            dfs(node.left);
        }
        if(node.right) {
            dfs(node.right);
        }
    }
    dfs(root);
    return root;
};