export interface DataObj {
  text: string;
  notExist?: string;
  [propName: string]: any;
}

interface Options {
  scheduler?: Function;
  lazy?: boolean;
}

export interface EffectFn extends Function {
  deps?: Set<Function>[];
  options?: Options;
}
