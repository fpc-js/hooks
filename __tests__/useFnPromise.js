import { renderHook } from '@testing-library/react-hooks';
import { useFnPromise } from '../src';

/* global Promise */

const mkWait = (...args) =>
  new Promise(res =>
    setTimeout(() => res(args), 0)
  );

test('useFnPromise takes a promise from a function', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFnPromise(mkWait)
  );

  await waitForNextUpdate();

  expect(result.current[0]).toEqual([]);
});

test('useFnPromise takes additional arguments', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFnPromise(mkWait, 1, 2)
  );

  await waitForNextUpdate();

  expect(result.current[0]).toEqual([1, 2]);
});
