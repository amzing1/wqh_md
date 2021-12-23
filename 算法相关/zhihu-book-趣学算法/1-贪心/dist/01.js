"use strict";
//加勒比海盗船---最优装载问题
// 有一天，海盗们截获了一艘装满各种各样古董的货船，每一件古董都价值连城，
// 一旦打碎就失去了它的价值。海盗船载重量为C，每一件古董的重量为Wi，海盗们
// 该如何把尽可能多数量的宝贝装上海盗船呢？
function plunder(weights, c) {
    var Antiques = weights.map(function (weight, idx) { return ({ id: idx, weight: weight }); });
    Antiques.sort(function (a, b) { return a.weight - b.weight; });
    var sum = 0;
    var ret = [];
    Antiques.forEach(function (t) {
        sum += t.weight;
        if (sum <= c) {
            ret.push(t);
        }
    });
    return ret;
}
var c = 100;
var weights = [50, 20, 100, 80, 10, 30];
console.log(plunder(weights, c));
