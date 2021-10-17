import { RefObject } from 'react';

export interface RefObjectWithPrev<T> extends RefObject<T>, Function {
    readonly prev: T | null;
}

export interface IOptions {
  initialValue?: Element;
  onChange?: Function;
  onBeforeChange?: Function;
}

type IOverload = {
  // eslint-disable-next-line no-unused-vars
  <T> (onChange?: Function): RefObjectWithPrev<T>;
  // eslint-disable-next-line no-unused-vars
  <T> (options?: IOptions): RefObjectWithPrev<T>;
}

export const createRefWithPrev: IOverload = <T> (
  onChange?: IOptions | Function,
): RefObjectWithPrev<T> => {
  const _options = typeof onChange === 'function' ? { onChange } : onChange;

  const _onBeforeChange = _options?.onBeforeChange ?? (() => {});
  const _onChange = _options?.onChange ?? (() => {});

  const set = ((ref: T) => {
    _onBeforeChange();
    set.prev = set.current ?? null;
    set.current = ref ?? null;
    _onChange();
  }) as any;
  set.current = _options?.initialValue ?? null;
  set.prev = null;

  return set as RefObjectWithPrev<T>;
};
