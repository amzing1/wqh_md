function trim(str) {
    return str.trim();
}

function trim2(str) {
    return Array.prototype.filter.call(str, (c) => {
        return c!==' '
    }).join('');
}

let str = '   ssgjksdf jdksflj   ';
console.log(trim(str));
console.log(trim2(str));