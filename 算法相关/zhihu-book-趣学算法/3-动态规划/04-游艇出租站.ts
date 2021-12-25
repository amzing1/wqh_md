/***
 * 从a站-z站，中间每站可以停靠，停靠费用为r(start, end)，问从a到z
 * 所需最少租金（1-n）
 */
interface IMin {
  index: number;
  value: number;
}

function shipCost(n: number, cost: number[][]): number {
  const minCost = new Array(n);
  minCost[0] = 0;
  for (let i = 1; i < n; i++) {
    let cost1 = minCost[i - 1] + cost[i - 1][i];
    let cost2 = minCost[i - 2] ? minCost[i - 2] + cost[i - 2][i] : cost1;
    if (cost1 <= cost2) {
      minCost[i] = cost1;
    } else {
      minCost[i] = cost2;
    }
  }
  console.log(minCost);
  return minCost[n - 1];
}

const cost = [
  [0, 2, 6, 9, 15, 20],  //0 2 5 8 12 18
  [0, 0, 3, 5, 11, 18],
  [0, 0, 0, 3, 6, 12],
  [0, 0, 0, 0, 5, 8],
  [0, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 0, 0]
];

console.log(shipCost(6, cost));