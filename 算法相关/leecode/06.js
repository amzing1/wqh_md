var convert = function(s, numRows) {
    const length = s.length;
    const item = numRows - 1;
    const muls = Math.floor(length / (numRows - 1)) + item;

    const mat = new Array(numRows).fill(0).map((foo) => new Array(muls).fill(0));
    let row = 0, col = 0;
    let up2down = true;
    for (let i = 0, l = length; i < l; i++) {
        if (up2down) {
            mat[row][col] = s[i];
            if (row >= numRows - 1) {
                up2down = false;
                row--;
                col++;
            } else {
                row++;
            }
        } else {
            mat[row][col] = s[i];
            if (row <= 0) {
                up2down = true;
                row++;
            } else {
                row--;
                col++;
            }
        }
    }

    let ret = '';
    mat.forEach(item => item.forEach(v => {
        if (v) {
            ret += v;
        }
    }))

    return ret;
};

console.log(convert("PAYPALISHIRING", 3))
// PINAASRGPI
// PINALSIGYAHRPI
// PAHNAPLSIIGYIR
// PAHNAPLSIIGYIR