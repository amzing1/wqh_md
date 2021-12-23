function Node(value, pre) {
    this.value = value;
    this.pre = pre || null;
}

function dijkstra(matrix, start = 0) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    if(rows !== cols || start >= rows) {
        return new Error('邻接矩阵错误或者源点错误');
    }

    //初始化distance
    const distance = new Array(rows);
    for(let i = 0; i < rows; i++) {
        distance[i] = new Node(Infinity);
    }

    //初始化访问节点
    const visited = new Array(rows).fill(false);
    distance[start] = new Node(0);

    while(visited.some(v => !v)) {
        //更新节点访问
        visited[start] = true;

        //达到不了的节点不能作为中转节点
        if(distance[start].value < Infinity) {
            for(let j = 0; j < rows; j++) {
                if(matrix[start][j] + distance[start].value < distance[j].value) {
                    distance[j].value = matrix[start][j] + distance[start].value;
                    distance[j].pre = distance[start];
                }
            }
        }

        //找到当前最短路径作为中转跳点
        let minIndex = -1;
        let min = Infinity;
        for(let i = 0; i < rows; i++) {
            if(distance[i] < min) {
                min = distance[i];
                minIndex = i;
            }
        }
        start = minIndex;
    }
    return distance;
}