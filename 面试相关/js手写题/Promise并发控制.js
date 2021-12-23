class PromiseControl {
    constructor() {
        this.taskNum = 0;
        this.taskQueue = [];
    }

    async add(promiseCreator) {
        if(this.taskNum >= 2) {
            await new Promise(resolve => {
                this.taskQueue.push(resolve);
            })
        }

        this.taskNum++;
        let result = await promiseCreator();
        this.taskNum--;

        if(this.taskQueue.length>0) {
            this.taskQueue.shift()();
        }
        return result;
    }
}

let scheduler = new PromiseControl();

function timeout(wait, text) {
    scheduler.add(() => {
        new Promise((resolve,reject) => {
            setTimeout(resolve, wait);
        })
    }).then(()=>{
        console.log(text);
    })
}