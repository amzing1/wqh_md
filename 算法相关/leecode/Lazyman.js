class LazyMan {
  constructor(name) {
    this.name = name;
    this.taskList = [];
    this.sayName();
    setTimeout(() => {
      this.run();
    }, 0);
  }

  sayName() {
    this.taskList.push(()=>{
      console.log('name: ' + this.name);
      
    })  
    return this;
  }

  eat(which) {
    this.taskList.push(()=>{
      console.log('eat: ' + which);
      
    })
    return this;
  }

  sleep(time) {
    this.taskList.push(() => {
      let now = new Date();
      while(true) {
        if(new Date()-now >= time*1000) break;
      }
      console.log('sleep: ' + time);
      
    })
    return this;
  }

  sleepFirst(time) {
    this.taskList.unshift(() => {
      let now = new Date();
      while(true) {
        if(new Date()-now >= time*1000) break;
      }
      console.log('sleep: ' + time);
      
    })
    return this;
  }

  run() {
    this.taskList.forEach(fn => fn());
  }
}

new LazyMan('Jack').eat('lunch').sleep(1).eat('dinner').sleepFirst(2);