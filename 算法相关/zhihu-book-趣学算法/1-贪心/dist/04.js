function Node(val, pre) {
    this.val = val // 当前距离
    this.pre = pre || null // 中转（前置）节点
}

function Dijkstra(matrix, start = 0) {
    const rows = matrix.length,//rows和cols一样，其实就是顶点个数
        cols = matrix[0].length;

    if (rows !== cols || start >= rows) return new Error("邻接矩阵错误或者源点错误");

    //初始化distance
    let distance = new Array(rows)
    for (let i = 0; i < rows; ++i) {
        distance[i] = new Node(Infinity)
    }
    // 初始化访问节点
    let visited = new Array(rows).fill(false);
    distance[start] = new Node(0);

    // 存在节点未访问则循环
    while (visited.some(item => !item)) {
        // 更新节点访问
        visited[start] = true
        // 达到不了的顶点不能作为中转跳点
        if (distance[start].val < Infinity) {
            for (let j = 0; j < cols; j++) {
                //通过比较distance[start] + matrix[start][j]和distance[j]的大小来决定是否更新distance[j]。
                if (matrix[start][j] + distance[start].val < distance[j].val) {
                    distance[j].val = matrix[start][j] + distance[start].val;
                    distance[j].pre = distance[start];
                }
            }
        }

        // 找到当前最短路径顶点作为中转跳点
        let minIndex = -1;
        let min = Infinity;
        for (let k = 0; k < rows; k++) {
            if (!visited[k] && distance[k].val < min) {
                min = distance[k].val;
                minIndex = k;
            }
        }
        start = minIndex
    }
    return distance;
}

const mat = [
    [Infinity, 2, 5, Infinity, Infinity],
    [Infinity, Infinity, 2, 6, Infinity],
    [Infinity, Infinity, Infinity, 7, 1],
    [Infinity, Infinity, 2, Infinity, 4],
    [Infinity, Infinity, Infinity, Infinity, Infinity]
];

console.log(Dijkstra(mat));
