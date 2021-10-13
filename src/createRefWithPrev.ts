import { RefObject } from 'react';

export interface RefObjectWithPrev<T> extends RefObject<T>, Function {
    readonly prev: T | null;
}

export const createRefWithPrev = <T extends Element> (initialValue: T | null = null, onChange?: Function): RefObjectWithPrev<T> => {
  const set = ((ref: T) => {
    set.prev = set.current;
    set.current = ref;
    onChange?.();
  }) as any;
  set.current = initialValue;

  return set as RefObjectWithPrev<T>;
};
