"use strict";
var PathNode = /** @class */ (function () {
    function PathNode(value, pre) {
        this.value = value;
        this.pre = pre || null;
    }
    return PathNode;
}());
function dijkstra(matrix, start) {
    if (start === void 0) { start = 0; }
    if (matrix.length === 0) {
        throw Error('没有邻接矩阵!');
    }
    var rows = matrix.length;
    var cols = matrix[0].length;
    if (rows !== cols || start > rows) {
        throw Error('邻接矩阵错误或者源点不存在');
    }
    //distance init
    var distance = new Array(rows);
    for (var i = 0; i < rows; i++) {
        distance[i] = new PathNode(Infinity);
    }
    distance[start] = new PathNode(0);
    //visited
    var visited = new Array(rows).fill(false);
    while (visited.some(function (v) { return !v; })) {
        console.log('loop', start);
        visited[start] = true;
        //达到不了的节点不能作为中转节点
        if (distance[start].value < Infinity) {
            for (var j = 0; j < rows; j++) {
                if (matrix[start][j] + distance[start].value < distance[j].value) {
                    distance[j].value = matrix[start][j] + distance[start].value;
                    distance[j].pre = distance[start];
                }
            }
        }
        var min = Infinity;
        var minIdx = -1;
        for (var k = 0; k < rows; k++) {
            if (!visited[k] && distance[k].value < min) {
                min = distance[k].value;
                minIdx = k;
            }
        }
        start = minIdx;
    }
    return distance;
}
var mat = [
    [Infinity, 2, 5, Infinity, Infinity],
    [Infinity, Infinity, 2, 6, Infinity],
    [Infinity, Infinity, Infinity, 7, 1],
    [Infinity, Infinity, 2, Infinity, 4],
    [Infinity, Infinity, Infinity, Infinity, Infinity]
];
console.log(dijkstra(mat));
