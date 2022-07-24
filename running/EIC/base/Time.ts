export interface Timer {
  start: number,
  val: number,
  timeOut: number,
  isDone: boolean
}
export class Time {
  static delta: number;
  static startTime: number = performance.now();
  static totalTime: number;
  static curTime: number = performance.now();
  static timers: Timer[] = [];

  static createTimer(timeOut: number) {
    const curTime = {
      start: performance.now(),
      val: performance.now(),
      timeOut,
      isDone: timeOut <= 0 ? true : false
    };
    Time.timers.push(curTime);
    return curTime;
  }

  static tick() {
    Time.timers.forEach(timer => {
      timer.val += Time.delta;
      if (timer.val - timer.start >= timer.timeOut) {
        timer.isDone = true;
      }
    })
    Promise.resolve().then(() => {
      Time.timers = Time.timers.filter(timer => !timer.isDone)
    })
  }
}