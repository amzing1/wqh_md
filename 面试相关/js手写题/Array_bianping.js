function bianping(array) {
    let res = []
    for(let a of array) {
        if(Array.isArray(a)) {
            res = res.concat(bianping(a));
        } else {
            res.push(a);
        }
    }
    return res;
}

let arr = [[1,2,3],4,[5,[6,7]]]
console.log(bianping(arr));