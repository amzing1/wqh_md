Function.prototype.applyNew = function(context, args) {
    context.fn = this;
    let res;
    if(!args) {
        res = context.fn();
    } else {
        res = context.fn(...args);
    }
    delete context.fn;
    return res;
}

// test
let obj = {
    name: 'jack'
  }
  function test(arg1, arg2, arg3) {
    console.log(this.name)   // jack
    console.log(arg1, arg2, arg3);  // 1 2 3
  }
  test.applyNew(obj, [1,2,3]);
  console.log(obj)