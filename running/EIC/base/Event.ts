export class Event {
  static keyActions: Set<string> = new Set();

  static initEvent() {
    Event.initKeyEvent();
  }

  static initKeyEvent() {
    document.addEventListener('keydown', (e) => {
      Event.keyActions.add(e.key.toLocaleLowerCase());
    });
    document.addEventListener('keyup', (e) => {
      Event.keyActions.delete(e.key.toLocaleLowerCase());
    });
  }
}