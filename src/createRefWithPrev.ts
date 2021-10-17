import { RefObject } from 'react';

type BaseRefObjectWithPrev<T> = RefObject<T> & ((newRef?: T) => void);

export interface RefObjectWithPrev<T> extends BaseRefObjectWithPrev<T> {
    readonly prev: T | null;
}

export interface IOptions<T = any> {
  initialValue?: T;
  onChange?: Function;
  onBeforeChange?: Function;
}

export const createRefWithPrev:
  (<T> (onChange?: Function) => RefObjectWithPrev<T>)
  & (<T> (options?: IOptions<T>) => RefObjectWithPrev<T>)
  = <T> (
  onChange?: IOptions<T> | Function,
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
