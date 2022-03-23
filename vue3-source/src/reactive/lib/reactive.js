import { INERATE_KEY, TriggerType } from "./constance";

const bucket = new WeakMap();
let activeEffect = null;
const effectStack = [];

function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
        effectFn.deps[i].delete(effectFn);
    }
    effectFn.deps.length = 0;
}

export function effect(fn, options = {}) {
    const effectFn = () => {
        cleanup(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn);
        const res = fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return res;
    }
    effectFn.deps = [];
    effectFn.options = options;
    if (!options.lazy) {
        effectFn();
    }
    return effectFn;
}

export function track(target, key) {
    if (!activeEffect) {
        return;
    }
    let effectMap = bucket.get(target);
    if (!effectMap) {
        bucket.set(target, effectMap = new Map());
    }
    let effects = effectMap.get(key);
    if (!effects) {
        effectMap.set(key, effects = new Set());
    }
    effects.add(activeEffect);
    activeEffect.deps.push(effects);
}

export function trigger(target, key, type, newVal) {
    const effectMap = bucket.get(target);
    if (!effectMap) {
        return;
    }
    const effects = effectMap.get(key);
    const effectToRun = new Set();

    effects && effects.forEach(fn => {
        effectToRun.add(fn);
    });
    
    if (type === TriggerType.ADD || type === TriggerType.DELETE) {
        const interateEffects = effectMap.get(INERATE_KEY);
        interateEffects && interateEffects.forEach(fn => {
            effectToRun.add(fn);
        })
    }

    if (type === TriggerType.ADD && Array.isArray(target)) {
        const lengthEffects = effectMap.get('length');
        lengthEffects && lengthEffects.forEach(fn => {
            effectToRun.add(fn);
        })
    }

    if (Array.isArray(target) && key === 'length') {
        effectMap.forEach((fns, key) => {
            if (key >= newVal) {
                fns.forEach(fn => {
                    effectToRun.add(fn);
                })
            }
        })
    }
    
    effectToRun.forEach(fn => {
        if (fn !== activeEffect) {
            if (fn.options.scheduler) {
                fn.options.scheduler(fn);
            } else {
                fn();
            }
        }
    })
}

export function createReactive(data, options = {}) {
    const obj = new Proxy(data, {
        get(target, key, receiver) {
            if (key === 'raw') {
                return target;
            }
            if (!options.isReadOnly) {
                track(target, key);
            }
            const res = Reflect.get(target, key, receiver);
            if (res instanceof Object && !options.isShallow) {
                return createReactive(res, options);
            }
            return res;
        },
        has(target, key) {
            track(target, key);
            return Reflect.has(target, key);  
        },
        ownKeys(target) {
            track(target, INERATE_KEY);
            return Reflect.ownKeys(target);
        },
        set(target, key, newVal, receiver) {
            if (options.isReadOnly) {
                console.warn(`属性${key}是只读的`);
                return;
            }
            let oldVal = target[key];
            let type = TriggerType.SET;
            if(!Object.prototype.hasOwnProperty.call(target, key) || (Array.isArray(target) && Number(key) < target.length)) {
                type = TriggerType.ADD; 
            }
            Reflect.set(target, key, newVal, receiver);
            if (target === receiver.raw && !Object.is(oldVal, newVal)) {
                trigger(target, key, type, newVal);
            }
            return true;
        },
        deleteProperty(target, key) {
            if (options.isReadOnly) {
                console.warn(`属性${key}是只读的`);
                return;
            }
            const hadKey = Object.prototype.hasOwnProperty.call(target, key);
            const res = Reflect.deleteProperty(target, key);
            if (res && hadKey) {
                trigger(target, key, TriggerType.DELETE);
            }
            return true;
        }
    });
    return obj;
}