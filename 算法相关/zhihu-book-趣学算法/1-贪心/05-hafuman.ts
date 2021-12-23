/***
 * 哈夫曼编码核心：出现频率越高的字符距离根节点越近
 * 问题：
 * 假设我们现在有一些字符和它们的使用频率，如何得到
 * 它们的哈夫曼编码呢？
 * 字符：   a   b   c   d   e   f
 * 频率：   5   32  18  7   25  13 （*100后的结果）
 */


class HufumanNode {
    value: string;
    weight: number;
    left: HufumanNode | null;
    right: HufumanNode | null;
    constructor(weight: number, value: string = '', left: null | HufumanNode = null, right: null | HufumanNode = null) {
        this.weight = weight;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function createTree(nodes: HufumanNode[]) {
    nodes.sort((a, b) => a.weight - b.weight);
    const left = nodes.shift();
    const right = nodes.shift();
    if(!left || !right) {
        throw Error('error');
    }
    const node = new HufumanNode(left.weight + right.weight, '', left, right);
    nodes.push(node);
    nodes.sort((a, b) => a.weight - b.weight);
}

function HufumanTree(nodes: HufumanNode[]): HufumanNode {
    const length = nodes.length;
    if(length === 0) {
        throw Error('length 0!');
    }
    if(nodes.length === 1) {
        return nodes[0];
    }
    while(nodes.length !== 1) {
        createTree(nodes);
    }
    return nodes[0];
}


function createNode(char: string, fre: number): HufumanNode {
    return new HufumanNode(fre, char);
}

const nodeArr = [createNode('a', 5), createNode('b', 32), createNode('c', 18), createNode('d', 7), createNode('e', 25), createNode('f', 13)];
console.log(HufumanTree(nodeArr));