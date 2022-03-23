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