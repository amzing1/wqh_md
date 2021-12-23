const compose = function(...fns) {
    return (...args) => {
        let ret = null;
        for(let i = fns.length - 1; i >= 0; i--) {
            ret = ret === null ? fns[i](...args) : fns[i](ret);
        }
        return ret;
    }
}

const fn1 = (arg) => {
    return arg + 'fn1';
}

const fn2 = (arg) => {
    return arg + 'fn2';
}

const fn3 = (arg1, arg2, arg3) => {
    return arg1 + arg2 + arg3;
}

const fn = compose(fn1, fn2, fn3);

console.log(fn('hello', 'world', '!!!'));