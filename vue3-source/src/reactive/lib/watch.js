import { effect } from "./reactive";

function traverse(data, seen = new Set()) {
    if (typeof data !== 'object' || data === null || seen.has(data)) {
        return;
    }
    seen.add(data);
    for (let key in data) {
        if (data[key] instanceof Object) {
            traverse(data[key], seen);
        }
    }
    return data;
}


export function watch(source, callback, config) {
    const sourceFn = source instanceof Function ? source : () => traverse(source);
    let newVal, oldVal;
    
    const job = () => {
        newVal = effectFn();
        callback(newVal, oldVal);
        oldVal = newVal;
    }

    const effectFn = effect(sourceFn, {
        scheduler: job
    });
    
    if(config.immediate) {
        job();
    } else {
        oldVal = effectFn();
    }
    
}