/**
 * 阿里巴巴与四十大盗-背包问题
 * 假设山洞中有n种宝物，每种宝物有一定重量w和相应的价值v
 * 毛驴运载能力有限，这能运走m重量的宝物，一种宝物只能拿一样
 * 宝物可以分割。那么怎样才能使毛驴运走宝物的价值最大呢？
 */
interface Old {
    weight: number;
    value: number;
}
interface Treasure extends Old{
    ratio: number;
}
function scheme(treasures: Old[], m: number): Treasure[] {
    const tres: Treasure[] = treasures.map(t => {
        (t as Treasure).ratio = t.value / t.weight;
        return t as Treasure;
    });
    tres.sort((a, b) => b.ratio - a.ratio);
    let sum: number = 0;
    let ret: Treasure[] = [];
    tres.forEach(t => {
        sum += t.weight;
        if(sum <= m) {
            ret.push(t);
        }
    });
    return ret;
}

const olds: Old[]= [
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
const m: number = 10;
console.log(scheme(olds, m));