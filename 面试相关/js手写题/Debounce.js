function debounce(fn, wait) {
    let timeout = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
}

let fn1 = function(a,b,c) {
    console.log(a+b+c);
}

debounce(fn1, 1000)(1,2,3);