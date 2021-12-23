function myInterval(fn, time, ...args) {
    let context = this;
    setTimeout(() => {
      fn.call(context, ...args);
      myInterval(fn, time, ...args);
    }, time);
  }

function say(a) {
  console.log('hello world' + a);
}

myInterval(say, 1000, '!!!');