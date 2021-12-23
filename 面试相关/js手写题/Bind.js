Function.prototype.bindNew = function(context, ...args) {
    return (...newArgs) => {
        this.apply(context, [...args, ...newArgs]);
    }
}

const bind_test = {
    name: 'fy',
    showName: function(...arguments) {
        console.log(this.name);
        console.log(...arguments)
    }
}

bind_test.showName("handsome"); // fy is handsome
bind_test.showName.bind({ name: "Mr.fy" }, 'arg1', 'arg2')("handsome", 'arg3');
bind_test.showName.bindNew({ name: "Mr.fy" }, 'arg1', 'arg2')("handsome", 'arg3');