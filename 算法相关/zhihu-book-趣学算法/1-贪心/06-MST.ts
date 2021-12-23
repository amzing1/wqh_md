// 无向连通带权图
// 带权邻接矩阵
const mst_mat = [
    [Infinity, 23, Infinity, Infinity, Infinity, 28, 36],
    [23, Infinity, 20, Infinity, Infinity, Infinity, 1],
    [Infinity, 20, Infinity, 15, Infinity, Infinity, 4],
    [Infinity, Infinity, 15, Infinity, 3, Infinity, 9],
    [Infinity, Infinity, Infinity, 3, Infinity, 17, 16],
    [28, Infinity, Infinity, Infinity, Infinity, 17, 25],
    [36, 1, 4, 9, 16, 25, Infinity]
];

class MSTNode {
    value: number;
    pre: MSTNode | null;
    id: number;
    visited: boolean;
    constructor(id: number, value: number, pre?: MSTNode | undefined, visited: boolean = false) {
        this.id = id;
        this.value = value;
        this.pre = pre || null;
        this.visited = visited;
    }
}

function mst(matrix: number[][], start = 0): MSTNode[] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    if (rows !== cols || start >= rows) {
        throw Error('error');
    }


    let mstNodes: MSTNode[] = new Array(rows);
    for (let i = 0; i < rows; i++) {
        mstNodes[i] = new MSTNode(i, Infinity);
    }
    mstNodes[start].value = 0;
    while (mstNodes.some(v => !v.visited)) {
        mstNodes[start].visited = true;
        let min = Infinity;
        let minIdx = -1;
        for (let i = 0; i < rows; i++) {
            if (!mstNodes[i].visited && matrix[start][i] < min) {
                min = matrix[start][i];
                minIdx = i;
            }
        }
        if(minIdx === -1) {
            let end: MSTNode | null = mstNodes[start];
            
            while(end) {
                console.log(end.id);
                end = end.pre;
            }
            break;;
        };
        mstNodes[minIdx].value = min;
        mstNodes[minIdx].pre = mstNodes[start];
        start = minIdx;


    }
    return mstNodes;
}
const ret = mst(mst_mat);
console.log(ret);