import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyPromise } from '../src/index.js';

/* global Promise */
/* eslint-disable no-plusplus, prefer-promise-reject-errors */

const asyncErr = () =>
  Promise.reject('err');

test('useLazyPromise does not call its function immediately', () => {
  const fn = jest.fn();
  renderHook(() => useLazyPromise(fn));

  expect(fn.mock.calls.length).toBe(0);
});

test('useLazyPromise accepts a default value', () => {
  const { result } = renderHook(() => useLazyPromise(() => {}, 1));

  const [,,, update] = result.current;
  expect(result.current).toEqual([1, undefined, 'idle', update]);
});

test('useLazyPromise returns an update callback', async () => {
  let id = 0;
  const { result, waitForNextUpdate } = renderHook(() =>
    useLazyPromise(() => Promise.resolve(id++))
  );

  const [,,, update] = result.current;
  expect(result.current).toEqual([undefined, undefined, 'idle', update]);

  act(update);
  expect(result.current).toEqual([undefined, undefined, 'pending', update]);
  await waitForNextUpdate();
  expect(result.current).toEqual([0, undefined, 'resolved', update]);
});

test('useLazyPromise returns error value as second', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useLazyPromise(asyncErr)
  );

  const [,,, update] = result.current;
  expect(result.current).toEqual([undefined, undefined, 'idle', update]);

  act(update);
  expect(result.current).toEqual([undefined, undefined, 'pending', update]);
  await waitForNextUpdate();
  expect(result.current).toEqual([undefined, 'err', 'rejected', update]);
});

test('useLazyPromise works on multiple update', async () => {
  /* eslint-disable no-plusplus */
  let id = 0;
  const { result, waitForNextUpdate } = renderHook(() =>
    useLazyPromise(() => Promise.resolve(id++))
  );

  const [,,, update] = result.current;

  act(update);
  await waitForNextUpdate();

  act(update);
  expect(result.current).toEqual([undefined, undefined, 'pending', update]);
  await waitForNextUpdate();
  expect(result.current).toEqual([1, undefined, 'resolved', update]);
});
