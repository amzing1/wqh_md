function myNew(fn, ...args) {
    let obj = {};
    obj.__proto__ = fn.prototype;
    let res = fun.apply(obj, args);
    return res instanceof Object ? res : obj;

}