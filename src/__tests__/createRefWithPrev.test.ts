import { createRefWithPrev } from '../createRefWithPrev';

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
