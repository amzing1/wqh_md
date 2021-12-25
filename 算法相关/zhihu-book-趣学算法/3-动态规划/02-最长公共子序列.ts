
function getMaxSub(a: string, b: string): string {
  const matrix: number[][] = new Array(a.length);
  for(let i = 0; i < a.length; i++) {
    matrix[i] = new Array(b.length).fill(0);
  }
  let max = 0;
  let iIndex = 0;
  for(let i = 0; i < a.length; i++) {
    for(let j = 0; j < b.length; j++) {
      if(a[i] === b[j]) {
        if(i > 0 && j > 0 && a[i-1] === b[j-1]) {
          matrix[i][j] = matrix[i-1][j-1] + 1;
        } else {
          matrix[i][j] = 1;
        }
        if(matrix[i][j] > max) {
          max = matrix[i][j];
          iIndex = i;
        }
      }
    }
  }
  return a.slice(iIndex - max + 1, iIndex + 1);
}

console.log(getMaxSub('abdcbd', 'bbdcbatds'));