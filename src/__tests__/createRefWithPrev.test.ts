import { createRefWithPrev, IOptions } from '../createRefWithPrev';

describe('initial value', () => {
  it('should be null when not specified', () => {
    const ref = createRefWithPrev();

    expect(ref.current).toBeNull();
  });

  it('should be the same as provided', () => {
    const div = document.createElement('div');
    const ref = createRefWithPrev(div);

    expect(ref.current).toBe<HTMLDivElement>(div);
  });
})

describe('current', () => {
  it('should be changed when ref is invoked', () => {
    const ref = createRefWithPrev();
    const div = document.createElement('div');
    ref(div);

    expect(ref.current).toBe<HTMLDivElement>(div);
  });
})

describe('prev', () => {
  it('should be the old value of current', () => {
    const div1 = document.createElement('div');
    const ref = createRefWithPrev(div1);
    const div2 = document.createElement('div');
    ref(div2);

    expect(ref.prev).toBe<HTMLDivElement>(div1);
  });

  it('should have null initial value', () => {
    const div = document.createElement('div');
    const ref = createRefWithPrev(div);

    expect(ref.prev).toBeNull();
  });
})

describe('onChange', () => {
  it('should be called when passed directly', function () {
    const onChange = jest.fn();
    const ref = createRefWithPrev(null, onChange);
    ref();

    expect(onChange).toBeCalledTimes(1);
  });

  it('should be called when passed through options object', function () {
    const onChange = jest.fn();
    const ref = createRefWithPrev(null, { onChange });
    ref();

    expect(onChange).toBeCalledTimes(1);
  });
})

describe('onBeforeChange', () => {
  it('should be called when passed', function () {
    const onBeforeChange = jest.fn();
    const ref = createRefWithPrev(null, { onBeforeChange });
    ref();

    expect(onBeforeChange).toBeCalledTimes(1);
  });

  it('should be called before onChange', function () {
    const options = {
      onBeforeChange: jest.fn(),
      onChange: () => expect(options.onBeforeChange).toBeCalled(),
    } as IOptions;

    createRefWithPrev(null, options)();
  });
})
