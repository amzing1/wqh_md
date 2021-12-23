function qkb(obj) {
    let res = obj instanceof Array ? [] : {};
    for(let key in obj) {
        res[key] = obj[key]
    }
    return res;
}

function skb(obj) {
    let res = obj instanceof Array ? [] : {};
    for(let key in obj) {
        if(obj[key] instanceof Object) {
            res[key] = skb(obj[key])
        } else {
            res[key] = obj[key]
        }
    }
    return res;
}

let o = {a: 1, b:[1,2,3], c: {c1:4,c2: 5}, d:[[6,7],[8,9]], e:{e1:{ee1:10,ee2:11}}};
let o1 = qkb(o);
let o2 = skb(o);
o1.a=2;