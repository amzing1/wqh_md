const decorator = (target, key, description) => {
    console.log(target, key, description);
}

// 装饰类
@decorator
class MyClass {
    constructor() {
        this._testNumber = 0;
    }
}

let ins = new MyClass();

