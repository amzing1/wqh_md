/***
 * 矩阵连乘问题就是对于给定 n个连乘矩阵，找出一种加括号的方法
 * 是的矩阵连乘的计算量（乘法次数最小）
 * 
 *        5*10  10*100  100*2   2*200   200*4   4*1
 *  0     5000    0    0   0
 *  5000   0      200  0   0
 *  0     200     0    40000  0
 *  0     0       40000 0   800
 * 0  0   0   800 0
 */ 

//暂时没做出来 
function mulMatrix(matrixs: number[][][]) {
  const length = matrixs.length;
  if(length < 3) {
    throw Error('不用加括号！');
  }
  let matrixMap = new Array(length).fill(0)
            .map(() => new Array(length).fill(0));
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < length; j++) {
      if(Math.abs(i - j) === 1) {
        const m1 = matrixs[i].length;
        const m2 = matrixs[i][0].length;
        const m3 = i < j ? matrixs[j][0].length : matrixs[j].length;
        matrixMap[i][j] = m1 * m2 * m3;
      }
    }
  }
  matrixMap = matrixMap.map(item => item.filter(i => !i));
  for(let i = 1; i < length - 1; i += 2) {
    if(matrixMap[i][0] < matrixMap[i+1][1]) {
      console.log(`在${i-1}和${i}之间打括号`);
    } else {
      console.log(`在${i}和${i+1}之间打括号`);
    }
  }
}


const matrix1 = new Array(5).fill(0).map(() => new Array(10).fill(0));
const matrix2 = new Array(10).fill(0).map(() => new Array(100).fill(0));
const matrix3 = new Array(100).fill(0).map(() => new Array(2).fill(0));
const matrix4 =new Array(2).fill(0).map(() => new Array(200).fill(0));
const matrix5 = new Array(4).fill(0).map(() => new Array(4).fill(0));
const matrix6 = new Array(4).fill(0).map(() => new Array(1).fill(0));

mulMatrix([matrix1, matrix2, matrix3, matrix4, matrix5, matrix6]);