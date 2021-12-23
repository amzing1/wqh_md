function Node(value, pre) {
    this.value = value;
    this.pre = pre || null;
}

function dijkstra(matrix, start = 0) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    if(rows !== cols || start >= rows) {
        throw Error('error');
    }
    const distance = new Array(rows).fill(new Node(Infinity));
    const visited = new Array(rows).fill(false);
    distance[start] = new Node(0);
    while(visited.some(v => !v)) {
        visited[start] = true;
        if(distance[start].value < Infinity) {
            for(let i=0; i<rows; i++) {
                if(matrix[start][i] + distance[start].value < distance[i].value) {
                    distance[i].value = matrix[start][i] + distance[start].value;
                    distance[i].pre = distance[start];
                }
            }
        }
        let min = Infinity;
        let minIdx = -1;
        for(let i=0; i<rows; i++) {
            if(!visited[i] && distance[i].value < min) {
                min = distance[i].value;
                minIdx = i;
            }
        }
        start = minIdx;
    }
    return distance;
}