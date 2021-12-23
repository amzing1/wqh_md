// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

//  

// 示例 1：


// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/spiral-matrix
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

var spiralOrder = function (matrix) {
  let left = 0;
  let bottom = matrix.length - 1;
  let right = matrix[0].length - 1;
  let top = 0;
  let result = [];

  while (left <= right && top <= bottom) {

    //left->right
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }

    //top->bottom
    for (let i = top + 1; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }

    if (left < right && top < bottom) {
      //right->left
      for (let i = right - 1; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }

      //bottom->top
      for (let i = bottom - 1; i >= top + 1; i--) {
        result.push(matrix[i][left]);
      }
    }
    top++;
    bottom--;
    left++;
    right--;
  }

  return result;

};

function spiralOrder(matrix) {
  if(matrix.length===0) return [];
  let left = 0;
  let right = matrix[0].length-1;
  let top = 0;
  let bottom = matrix.length-1;
  let result = [];

  while(left <= right && top <= bottom) {
    for(let i=left; i<=right; i++) {
      result.push(matrix[top][i]);
    }
    for(let i=top+1; i<=bottom; i++) {
      result.push(matrix[i][right]);
    }
    if(left < right && top < bottom) {
      for(let i=right-1; i>=left; i--) {
        result.push(matrix[bottom][i]);
      }
      for(let i=bottom-1; i>=top+1; i--) {
        result.push(matrix[i][left]);
      }
    }
    left++;
    right--;
    top++;
    bottom--;
  }

  return result;
}