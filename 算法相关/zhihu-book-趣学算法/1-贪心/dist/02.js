"use strict";
function scheme(treasures, m) {
    var tres = treasures.map(function (t) {
        t.ratio = t.value / t.weight;
        return t;
    });
    tres.sort(function (a, b) { return b.ratio - a.ratio; });
    var sum = 0;
    var ret = [];
    tres.forEach(function (t) {
        sum += t.weight;
        if (sum <= m) {
            ret.push(t);
        }
    });
    return ret;
}
var olds = [
    {
        weight: 1,
        value: 100,
    },
    {
        weight: 2,
        value: 50,
    },
    {
        weight: 3,
        value: 1000,
    },
    {
        weight: 10,
        value: 100000
    },
];
var m = 10;
console.log(scheme(olds, m));
