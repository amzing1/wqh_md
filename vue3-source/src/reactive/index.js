import { createReactive } from "./lib/reactive";

export function reactive(data) {
    return createReactive(data, {
        isShallow: false
    })
}

export function shallowReactive(data) {
    return createReactive(data, {
        isShallow: true
    })
}

export function readonly(data) {
    return createReactive(data, {
        isShallow: false,
        isReadOnly: true
    })
}

export function shallowReadonly(data) {
    return createReactive(data, {
        isShallow: true,
        isReadOnly: true
    })
}

export function ref(val) {
    const wrapper = {
        value: val
    }
    Object.defineProperty(wrapper, '_v_isRef', {
        value: true
    });
    return reactive(wrapper);
}

export function toRef(obj, key) {
    const wrapper = {
        get value() {
            return obj[key];
        },
        set value(val) {
            obj[key] = val;
        }
    }

    Object.defineProperty(wrapper, '_v_isRef', {
        value: true
    })
    return wrapper;
}

export function toRefs(obj, key) {
    const ret = {};
    for (const key in obj) {
        ret[key] = toRef(obj[key]);
    }
    return ret;
}

// 自动脱/穿 ref
export function proxyRefs(target) {
    return new Proxy(target, {
        get(target, key, receiver) {
            const value = Reflect.get(target, key, receiver);
            return value._v_isRef ? value.value: value;
        },
        set(target, key, newValue, receiver) {
            const value = target[key];
            if (value._v_isRef) {
                value.value = newValue;
                return true;
            }
            return Reflect.set(target, key, newValue, receiver);
        }
    })
}