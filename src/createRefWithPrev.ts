import { RefObject } from 'react';

export interface RefObjectWithPrev<T> extends RefObject<T>, Function {
    readonly prev: T | null;
}

export interface IOptions {
  onChange?: Function;
  onBeforeChange?: Function;
}

type IOverload = {
  <T extends Element> (initialValue?: T | null, onChange?: Function): RefObjectWithPrev<T>;
  <T extends Element> (initialValue?: T | null, options?: IOptions): RefObjectWithPrev<T>;
}

export const createRefWithPrev: IOverload = <T extends Element> (initialValue?: T | null, options?: Function | IOptions): RefObjectWithPrev<T> => {
  const _options = typeof options === 'function' ? { onChange: options } as IOptions : options;

  const set = ((ref: T) => {
    _options?.onBeforeChange?.();
    set.prev = set.current ?? null;
    set.current = ref ?? null;
    _options?.onChange?.();
  }) as any;
  set.current = initialValue ?? null;
  set.prev = null;

  return set as RefObjectWithPrev<T>;
};
