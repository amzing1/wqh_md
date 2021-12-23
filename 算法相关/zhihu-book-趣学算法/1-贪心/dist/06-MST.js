"use strict";
// 无向连通带权图
// 带权邻接矩阵
var mst_mat = [
    [Infinity, 23, Infinity, Infinity, Infinity, 28, 36],
    [23, Infinity, 20, Infinity, Infinity, Infinity, 1],
    [Infinity, 20, Infinity, 15, Infinity, Infinity, 4],
    [Infinity, Infinity, 15, Infinity, 3, Infinity, 9],
    [Infinity, Infinity, Infinity, 3, Infinity, 17, 16],
    [28, Infinity, Infinity, Infinity, Infinity, 17, 25],
    [36, 1, 4, 9, 16, 25, Infinity]
];
var MSTNode = /** @class */ (function () {
    function MSTNode(id, value, pre, visited) {
        if (visited === void 0) { visited = false; }
        this.id = id;
        this.value = value;
        this.pre = pre || null;
        this.visited = visited;
    }
    return MSTNode;
}());
function mst(matrix, start) {
    if (start === void 0) { start = 0; }
    var rows = matrix.length;
    var cols = matrix[0].length;
    if (rows !== cols || start >= rows) {
        throw Error('error');
    }
    var mstNodes = new Array(rows);
    for (var i = 0; i < rows; i++) {
        mstNodes[i] = new MSTNode(i, Infinity);
    }
    mstNodes[start].value = 0;
    while (mstNodes.some(function (v) { return !v.visited; })) {
        mstNodes[start].visited = true;
        var min = Infinity;
        var minIdx = -1;
        for (var i = 0; i < rows; i++) {
            if (!mstNodes[i].visited && matrix[start][i] < min) {
                min = matrix[start][i];
                minIdx = i;
            }
        }
        if (minIdx === -1) {
            var end = mstNodes[start];
            while (end) {
                console.log(end.id);
                end = end.pre;
            }
            break;
            ;
        }
        ;
        mstNodes[minIdx].value = min;
        mstNodes[minIdx].pre = mstNodes[start];
        start = minIdx;
    }
    return mstNodes;
}
var ret = mst(mst_mat);
console.log(mst(mst_mat));
