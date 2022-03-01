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

export function effect(fn: EffectFn) {
  const effectFn: EffectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}

function track(target: DataObj, key: string) {
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

function trigger(target: DataObj, key: string, newVal) {
  target[key] = newVal;
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);
  const effectsToRun = new Set<Function>();
  effects &&
    effects.forEach((fn) => {
      if (fn !== activeEffect) {
        effectsToRun.add(fn);
      }
    });
  effectsToRun.forEach((fn) => fn());
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
