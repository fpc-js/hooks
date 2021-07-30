import { renderHook, act } from '@testing-library/react-hooks';
import { useObjectState } from '../src/index.js';

/* eslint-disable-next-line max-statements */
test('useObjectState merges object properties', () => {
  const { result } = renderHook(() => useObjectState({ p1: 1 }));

  const [v1, update] = result.current;
  expect(v1.p1).toBe(1);

  act(() => update({ p2: 2 }));
  const [v2] = result.current;
  expect(v2.p1).toBe(1);
  expect(v2.p2).toBe(2);

  act(() => update({ p3: 3 }));
  const [v3] = result.current;
  expect(v3.p1).toBe(1);
  expect(v3.p2).toBe(2);
  expect(v3.p3).toBe(3);
});

test('useObjectState accepts an update function', () => {
  const { result } = renderHook(() => useObjectState({ p1: 1 }));

  const [v1, update] = result.current;
  expect(v1.p1).toBe(1);

  act(() => update(state => ({ p2: state.p1 + 1 })));
  const [v2] = result.current;
  expect(v2.p1).toBe(undefined);
  expect(v2.p2).toBe(2);
});

test('useObjectState accepts a function as initial argument', () => {
  const { result } = renderHook(() => useObjectState(() => ({ p1: 1 })));

  const [v1, update] = result.current;
  expect(v1.p1).toBe(1);

  act(() => update(state => ({ p2: state.p1 + 1 })));
  const [v2] = result.current;
  expect(v2.p1).toBe(undefined);
  expect(v2.p2).toBe(2);
});
