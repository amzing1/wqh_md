import { reactive } from "..";
import { INERATE_KEY, MAP_KEY_ITERATE_KEY, TriggerType } from "./constance";
import { track, trigger } from "./reactive";

export const arrayInstrumentation = {};

['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
    const originMethod = Array.prototype[method];
    arrayInstrumentation[method] = function(...args) {
        let res = originMethod.apply(this, args);
        if (res === false) {
            res = originMethod.apply(this.raw, args);
        }
        return res;
    }
})

export let shouldTrack = true;

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(method => {
    const originMethod = Array.prototype[method];
    arrayInstrumentation[method] = function(...args) {
        shouldTrack = false;
        const res = originMethod.apply(this, args);
        shouldTrack = true;
        return res;
    }  
})

export const mutableInstrumentation = {
    add(key) {
        const target = this.raw;
        const hadKey = target.has(key);
        const res = target.add(key);
        if (!hadKey) {
            trigger(target, INERATE_KEY, TriggerType.ADD);
        }
        return res;
    },
    delete(key) {
        const target = this.raw;
        const hadKey = target.has(key);
        const res = target.delete(key);
        if (!hadKey) {
            trigger(target, INERATE_KEY, TriggerType.DELETE);
        }
        return res;
    },
    get(key) {
        const target = this.raw;
        track(target, key);
        const res = target.get(key);
        return res instanceof Object ? reactive(res) : res;
    },
    set(key, value) {
        const target = this.raw;
        const oldValue = target.get(key);
        const hadKey = target.has(key);
        const res = target.set(key, value.raw || value);
        if (!hadKey) {
            trigger(target, key, TriggerType.ADD);
        } else if (!Object.is(value, oldValue)) {
            trigger(target, key, TriggerType.SET);
        }
        return res;
    },
    forEach(callback, thisArg) {
        const wrap = (v) => v instanceof Object ? reactive(v) : v;
        const target = this.raw;
        track(target, INERATE_KEY);
        target.forEach((v, k) => callback(thisArg, wrap(v), wrap(k), this));
    },
    [Symbol.iterator]: interationMethod,
    entries: interationMethod,
    values: () => singleIterationMethod('values'),
    keys: () => singleIterationMethod('keys')
}

function interationMethod() {
    const target = this.raw;
    const itr = target[Symbol.iterator]();

    const wrap = (val) => typeof val === 'object' ? reactive(val) : val;

    track(target, INERATE_KEY);

    return {
        next() {
            const { value, done } = itr.next();
            return {
                value: value ? [wrap(value[0]), wrap(value[1])] : value,
                done
            }
        },
        [Symbol.iterator]() {
            return this;
        }
    }
}

function singleIterationMethod(type) {
    const target = this.raw;
    const itr = target[type]();
    const wrap = (val) => typeof val === 'object' ? reactive(val) : val;

    if (type === 'keys') {
        track(target, MAP_KEY_ITERATE_KEY);
    } else if (type === 'values') {
        track(target, INERATE_KEY);
    }
    
    return {
        next() {
            const { value, done } = itr.next();
            return {
                value: wrap(value),
                done
            }
        },
        [Symbol.iterator]() {
            return this
        }
    }
}