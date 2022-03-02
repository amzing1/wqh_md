import { DataObj, EffectFn } from "../typings/testData";

let activeEffect: EffectFn;
const effectStack: EffectFn[] = [];
// const bucket = new Set<Function>();
const bucket = new WeakMap<DataObj, Map<string, Set<Function>>>();

function cleanup(fn: EffectFn) {
  for (let i = 0; i < fn.deps.length; i++) {
    const deps = fn.deps[i];
    deps.delete(fn);
  }
  fn.deps.length = 0;
}

export function effect(fn: EffectFn, options = {}) {
  const effectFn: EffectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    const res = fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    return res;
  };
  effectFn.deps = [];
  effectFn.options = options;
  if (!effectFn.options.lazy) {
    effectFn();
  }
  return effectFn;
}

export function track(target: DataObj, key: string) {
  if (!activeEffect) {
    return;
  }
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map<string, Set<Function>>()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set<Function>()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

export function trigger(target: DataObj, key: string, newVal) {
  target[key] = newVal;
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);
  const effectsToRun = new Set<EffectFn>();
  effects &&
    effects.forEach((fn) => {
      if (fn !== activeEffect) {
        effectsToRun.add(fn);
      }
    });
  effectsToRun.forEach((fn) => {
    if (fn.options.scheduler) {
      fn.options.scheduler(fn);
    } else {
      fn();
    }
  });
}

export function toResponseData(data: DataObj) {
  const obj = new Proxy(data, {
    get(target, key: string) {
      track(target, key);
      return target[key];
    },
    set(target, key: string, newVal) {
      trigger(target, key, newVal);
      return true;
    },
  });
  return obj;
}
