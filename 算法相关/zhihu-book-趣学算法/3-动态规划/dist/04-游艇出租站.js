"use strict";
function shipCost(n, cost) {
    const minCost = new Array(n);
    minCost[0] = 0;
    for (let i = 1; i < n; i++) {
        let cost1 = minCost[i - 1] + cost[i - 1][i];
        let cost2 = minCost[i - 2] ? minCost[i - 2] + cost[i - 2][i] : cost1;
        if (cost1 <= cost2) {
            minCost[i] = cost1;
        }
        else {
            minCost[i] = cost2;
        }
    }
    console.log(minCost);
    return minCost[n - 1];
}
const cost = [
    [0, 2, 6, 9, 15, 20],
    [0, 0, 3, 5, 11, 18],
    [0, 0, 0, 3, 6, 12],
    [0, 0, 0, 0, 5, 8],
    [0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0]
];
console.log(shipCost(6, cost));
