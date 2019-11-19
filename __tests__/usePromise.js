import { renderHook, act } from '@testing-library/react-hooks';
import { usePromise } from '../src';

/* global Promise */
/* eslint-disable no-return-assign */

test('usePromise returns [value]', async () => {
  let resolve;
  const promise = new Promise(res => resolve = res);

  const { result, waitForNextUpdate } = renderHook(() => usePromise(promise));

  act(() => resolve('ok'));

  await waitForNextUpdate();
  const [val, err] = result.current;
  expect(val).toBe('ok');
  expect(err).toBe(undefined);
});

test('usePromise returns [_, error]', async () => {
  let reject;
  const promise = new Promise((_, rej) => reject = rej);

  const { result, waitForNextUpdate } = renderHook(() => usePromise(promise));

  act(() => reject('err'));

  await waitForNextUpdate();
  const [val, err] = result.current;
  expect(val).toBe(undefined);
  expect(err).toBe('err');
});
