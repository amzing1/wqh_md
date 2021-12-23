var numIslands = function(grid) {
    let status = new Array(grid.length).fill(0).map(a => new Array(grid[0].length).fill(false));
    
    let landCount = 0;
    function dfs(grid, col, row, isStart) {
        if(col >= grid.length || row >= grid[0].length || col <0 || row<0) return;
        if(grid[col][row] == 0) return;
        if(grid[col][row] == 1 && !status[col][row]) {
            if(isStart) {
                landCount++;
            }
            status[col][row] = true;
            dfs(grid, col+1, row, false);
            dfs(grid, col, row+1, false);
            dfs(grid, col, row-1, false);
            dfs(grid, col-1, row, false);
        }
    }
    for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[i].length; j++) {
            dfs(grid, i, j, true);
        }
    }
    return landCount;
};

let grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]

console.log(numIslands(grid));