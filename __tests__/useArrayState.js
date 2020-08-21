import { renderHook, act } from '@testing-library/react-hooks';
import { useArrayState } from '../src';

/* eslint-disable-next-line max-statements */
test('useArrayState concat the state with given array at every update', () => {
  const { result } = renderHook(() => useArrayState([1]));

  const [v1, concat] = result.current;
  expect(v1[0]).toBe(1);

  act(() => concat([2]));
  const [v2] = result.current;
  expect(v2[0]).toBe(1);
  expect(v2[1]).toBe(2);

  act(() => concat([3]));
  const [v3] = result.current;
  expect(v3[0]).toBe(1);
  expect(v3[1]).toBe(2);
  expect(v3[2]).toBe(3);
});

test('useArrayState accepts an update function', () => {
  const { result } = renderHook(() => useArrayState([1]));

  const [v1, concat] = result.current;
  expect(v1[0]).toBe(1);

  act(() => concat(([fst]) => [fst + 1]));
  const [v2] = result.current;
  expect(v2[0]).toBe(2);
  expect(v2[1]).toBe(undefined);
});

test('useArrayState accepts a function as initial argument', () => {
  const { result } = renderHook(() => useArrayState(() => [1]));

  const [v1, concat] = result.current;
  expect(v1[0]).toBe(1);

  act(() => concat(([fst]) => [fst + 1]));
  const [v2] = result.current;
  expect(v2[0]).toBe(2);
  expect(v2[1]).toBe(undefined);
});
