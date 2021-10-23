type Callable<T> = ((newRef?: T) => void);

export interface RefObjectWithPrev<T> extends Callable<T> {
  readonly prev: T | null;
  readonly current: T | null;
}

export interface IOptions<T = any> {
  initialValue?: T | null;
  onChange?: Function;
  onBeforeChange?: Function;
}

export const createRefWithPrev:
(<T> (onChange?: Function) => RefObjectWithPrev<T>)
& (<T> (options?: IOptions<T>) => RefObjectWithPrev<T>) = <T> (
  onChange?: IOptions<T> | Function,
): RefObjectWithPrev<T> => {
  const _options = typeof onChange === 'function' ? { onChange } : onChange ?? {};

  const _onBeforeChange = _options.onBeforeChange ?? (() => {});
  const _onChange = _options.onChange ?? (() => {});

  const _state = {
    current: _options.initialValue ?? null,
    prev: null as typeof _options.initialValue,
  };

  return Object.defineProperties(((ref: T) => {
    _onBeforeChange();
    _state.prev = _state.current ?? null;
    _state.current = ref ?? null;
    _onChange();
  }), {
    current: { get() { return _state.current; } },
    prev: { get() { return _state.prev; } },
  }) as RefObjectWithPrev<T>;
};
