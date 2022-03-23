const jobQueue = new Set();
let isFlushing = false;
const p = Promise.resolve();

export function addJob(fn) {
    jobQueue.add(fn);
}

export function flushJob() {
    if (isFlushing) {
        return;
    }
    isFlushing = true;
    p.then(() => {
        jobQueue.forEach(fn => {
            fn();
        })
    }).finally(() => {
        isFlushing = false;
    })
}