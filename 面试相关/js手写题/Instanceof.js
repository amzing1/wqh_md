function my_instanceof(a,b) {
    let a_proto = a.__proto__;
    let b_proto = b.prototype;
    while(a_proto) {
        if(a_proto === b_proto) {
            return true;
        } else {
            a_proto = a_proto.__proto__;
        }
    }
    return false;
}


let a = [1,2,3];
let res = my_instanceof(a, Array);
console.log(res);