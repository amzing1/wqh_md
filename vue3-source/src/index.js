import { reactive } from "./reactive"
import { effect } from "./reactive/lib/reactive";


const data = [1, 2, 3];


const obj = reactive(data);

effect(() => console.log(obj[1]));

setTimeout(() => {
    obj.length = 0;
}, 1000);

