class NumMatrix {
  private preMatrix: number[][]
  constructor(matrix: number[][]) {
      const row = matrix.length
      const col = matrix[0].length
      this.preMatrix = new Array(row + 1).fill(0).map((item) => new Array(col + 1).fill(0))
      for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
              this.preMatrix[i + 1][j + 1] = this.preMatrix[i + 1][j] + this.preMatrix[i][j + 1] - this.preMatrix[i][j]  + matrix[i][j]
          }
      }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
      return this.preMatrix[row2 + 1][col2 + 1] - this.preMatrix[row1][col2 + 1] - this.preMatrix[row2 + 1][col1] + this.preMatrix[row1][col1]
  }
}

/**
* Your NumMatrix object will be instantiated and called as such:
* var obj = new NumMatrix(matrix)
* var param_1 = obj.sumRegion(row1,col1,row2,col2)
*/