import { effect, track, trigger } from "./reactive";
let value = '';
let dirty = true;

export function computed(getter) {
    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            dirty = true;
            trigger(obj, 'value');
        }
    });
    const obj = {
        get value() {
            if (dirty) {
                value = effectFn();
                dirty = false;
                track(obj, 'value');
            }
            return value;
        }
    }
    return obj;
}