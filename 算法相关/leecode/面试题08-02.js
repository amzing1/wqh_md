var pathWithObstacles = function(obstacleGrid) {
    let dp = new Array(obstacleGrid.length).fill(0).map(a => new Array(obstacleGrid[0].length).fill(0))
    let res = [];
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    if(obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1]) {
        return res;
    }
    dp[0][0] = true;
    for(let i=1;i<m;i++) {
        dp[i][0] = dp[i-1][0] && obstacleGrid[i][0] === 0;
    }
    for(let j=1;j<n;j++) {
        dp[0][j] = dp[0][j-1] && obstacleGrid[0][j] === 0;
    }
    for(let i=1;i<m;i++) {
        for(let j=1;j<n;j++) {
            dp[i][j] = obstacleGrid[i][j]===0 && (dp[i-1][j] || dp[i][j-1]);
        }
    }
    if(!dp[m-1][n-1]) return res;

    let i = m-1;
    let j = n-1;
    while(i>0 || j>0) {
        res.push([i,j]);
        if(i>0 && dp[i-1][j]) {
            i--;
        } else {
            j--;
        }
    }
    res.push([0,0]);
    return res.reverse();

};