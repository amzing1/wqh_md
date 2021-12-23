Array.prototype.reduce = function (func, defaultValue) {
    if(this.length <= 0) {
        throw error('array length is zero');
    }
    defaultValue = defaultValue === undefined ? this[0] : defaultValue;
    let result = defaultValue;
    for(let i = 0; i < this.length; i++) {
        result = func(result, this[i], i, this);
    }
    return result;
}

let arr = [1, 3, 5, 7, 9];
let result = arr.reduce((prev, next) => {
    return prev + next;
}, 0)

console.log(result);
