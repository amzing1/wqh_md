/***
 * 会议安排问题 -- 在规定时间内尽可能参加更多的会议
 * 会议时间表
 * 会议i    1   2    3    4    5    6    7    8    9    10
 * 开始bi   8   9    10   11   13   14   15   17   18   16
 * 结束ei   10  11   15   14   16   17   17   18   20   19
 */
interface Meeting {
    begin: number,
    end: number
}

function plan(meets: Meeting[], time: Meeting): Meeting[] {
    meets = meets.sort((a, b) => {
        if(a.end === b.end) {
            return b.begin - a.begin;
        }
        return a.end - b.end;
    });
    const ret: Meeting[] = [];
    let endTime: number = 0;
    meets.forEach(meet => {
        if(meet.begin >= time.begin && meet.end <= time.end && meet.begin >= endTime) {
            ret.push(meet);
            endTime = meet.end;
        }
    });
    return ret;
}
const meets: Meeting[] = [
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
const time: Meeting = {
    begin: 8,
    end: 15
};
console.log(plan(meets, time));