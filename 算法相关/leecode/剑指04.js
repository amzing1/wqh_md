
var findNumberIn2DArray = function(matrix, target) {

    if(matrix.length===0) return false;
    let rows = matrix.length;
    let cols = matrix[0].length;
    let row=0;
    let col=cols-1;
    while(row<rows && col<cols) {
        if(matrix[row][col]===target) return true;
        if(matrix[row][col]>target) col--;
        else {
            row++;
        }
    }
    return false;
};