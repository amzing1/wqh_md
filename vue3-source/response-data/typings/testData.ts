export interface DataObj {
  text: string;
  notExist?: string;
  [propName: string]: any;
}

export interface EffectFn extends Function {
  deps?: Set<Function>[];
}
