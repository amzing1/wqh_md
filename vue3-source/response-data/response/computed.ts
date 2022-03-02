import { DataObj, EffectFn } from "../typings/testData";
import { effect, track, trigger } from "./effect";

export function computed(getter: Function) {
  let value: any;
  let dirty = true;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true;
        trigger(obj as unknown as DataObj, "value", value);
      }
    },
  });
  const obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      track(obj as unknown as DataObj, "value");
      return value;
    },
    set value(newVal) {
      value = newVal;
    },
  };
  return obj;
}
