Function.prototype.callNew = function(context, ...args) {
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}