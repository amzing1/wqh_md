function Parent(name, age) {
    this.name = name;
    this.age = age;
}
Parent.prototype.sayParent = function() {
    console.log('parent', this.name, this.age)
}

function Child(name, age, grade) {
    Parent.call(this, name,age);
    this.grade = grade;
}
function getPro(Constr) {
    function f(){};
    f.prototype = Constr;
    return new f();
}
function inherit(parent, child) {
    let pro = Object.create(parent.prototype);
    child.prototype = pro;
    pro.constructor = child;
}

inherit(Parent, Child);

Child.prototype.sayChild = function() {
    console.log('child', this.name, this.age, this.grade)
}

let kid = new Child('wqh', 11, 6);
console.log(kid);
kid.sayChild();