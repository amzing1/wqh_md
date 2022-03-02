const jobQueue = new Set<Function>();
const p = Promise.resolve();
let isFlushing = false;

export function addJob(fn: Function) {
  jobQueue.add(fn);
}

export function flushJob() {
  if (isFlushing) {
    return;
  }
  isFlushing = true;
  p.then(() => {
    jobQueue.forEach((job) => job());
  }).finally(() => {
    isFlushing = false;
  });
}
