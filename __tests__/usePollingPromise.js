import { renderHook } from '@testing-library/react-hooks';
import { usePollingPromise } from '../src/index.js';

/* global Promise */

const mkWait = value =>
  new Promise(res =>
    setTimeout(() => res(value), 0)
  );

test('usePollingPromise takes a promise from a function', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    usePollingPromise(() => mkWait(3))
  );

  expect(result.current[0]).toBe(undefined);
  await waitForNextUpdate();
  expect(result.current[0]).toBe(3);
});

test('usePollingPromise takes default value as second arg', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    usePollingPromise(() => mkWait(3), 1)
  );

  expect(result.current[0]).toBe(1);
  await waitForNextUpdate();
  expect(result.current[0]).toBe(3);
});
