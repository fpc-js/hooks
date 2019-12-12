import { renderHook, act } from '@testing-library/react-hooks';
import { useMergingState } from '../src';

/* eslint-disable-next-line max-statements */
test('useMergingState merges object properties', () => {
  const { result } = renderHook(() => useMergingState({ p1: 1 }));

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

test('useMergingState accepts an update function', () => {
  const { result } = renderHook(() => useMergingState({ p1: 1 }));

  const [v1, update] = result.current;
  expect(v1.p1).toBe(1);

  act(() => update(state => ({ p2: state.p1 + 1 })));
  const [v2] = result.current;
  expect(v2.p1).toBe(undefined);
  expect(v2.p2).toBe(2);
});
