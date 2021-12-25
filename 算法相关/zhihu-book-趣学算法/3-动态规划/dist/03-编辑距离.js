"use strict";
/***
 * 编辑距离：
 * 将一个字符串变换为另一个字符串所需要的最小编辑次数（增删改 次数都为一）
 * eg: FAMILY --> FRAME
 * 1. 在F后插入R
 * 2. 将I替换为E
 * 3. 删除M
 * 4. 删除E
 * 所以将FAMILY->FRAME编辑次数为4
 */
function editDis(a, b) {
    const matrix = new Array(a.length + 1).fill(0).map(() => new Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) {
        for (let j = 0; j <= b.length; j++) {
            if (i === 0 || j === 0) {
                matrix[i][j] = i === 0 ? j : i;
            }
        }
    }
    console.log(matrix);
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            let diff = (a[i - 1] !== undefined && b[j - 1] !== undefined && a[i - 1] === b[j - 1]) ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]) + diff;
        }
    }
    console.log(matrix);
    return matrix[a.length][b.length];
}
console.log(editDis('FAMILY', 'FRAME'));
