class PathNode {
    pre: PathNode | null;
    value: number;
    constructor(value: number, pre?: undefined | PathNode) {
        this.value = value;
        this.pre = pre || null;
    }
} 

function dijkstra(matrix: number[][], start = 0): PathNode[] {
    if(matrix.length === 0) {
        throw Error('没有邻接矩阵!');
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    if(rows !== cols || start > rows) {
        throw Error('邻接矩阵错误或者源点不存在')
    }

    //distance init
    const distance: PathNode[] = new Array(rows);

    for(let i = 0; i < rows; i++) {
        distance[i] = new PathNode(Infinity);
    }

    distance[start] = new PathNode(0);

    //visited
    const visited: boolean[] = new Array(rows).fill(false);

    while(visited.some(v => !v)) {
        console.log('loop', start);
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
        
        let min: number = Infinity;
        let minIdx: number = -1;

        for(let k = 0; k < rows; k++) {
            if(!visited[k] && distance[k].value < min) {
                min = distance[k].value;
                minIdx = k;
            }
        }

        start = minIdx;
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

console.log(dijkstra(mat));