"use strict";
function plan(meets, time) {
    meets = meets.sort(function (a, b) {
        if (a.end === b.end) {
            return b.begin - a.begin;
        }
        return a.end - b.end;
    });
    var ret = [];
    var endTime = 0;
    meets.forEach(function (meet) {
        if (meet.begin >= time.begin && meet.end <= time.end && meet.begin >= endTime) {
            ret.push(meet);
            endTime = meet.end;
        }
    });
    return ret;
}
var meets = [
    {
        begin: 8,
        end: 15
    },
    {
        begin: 9,
        end: 10
    },
    {
        begin: 10,
        end: 14,
    },
    {
        begin: 12,
        end: 13,
    },
    {
        begin: 15,
        end: 16
    }
];
var time = {
    begin: 8,
    end: 15
};
console.log(plan(meets, time));
