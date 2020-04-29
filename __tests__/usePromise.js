import { renderHook, act } from '@testing-library/react-hooks';
import { deferred } from '@fpc/utils';
import { usePromise } from '../src';

/* eslint-disable no-return-assign */
/* eslint max-statements: ["warn", 15] */

/* global Promise */

const asyncUniqid = () => {
  let id = 0;

  /* eslint-disable-next-line no-plusplus */
  return () => Promise.resolve(id++);
};

test('usePromise returns [value, undefined, "resolved"]', async () => {
  const { promise, resolve } = deferred();
  const { result, waitForNextUpdate } = renderHook(() =>
    usePromise(promise)
  );

  expect(result.current).toEqual([undefined, undefined, 'pending']);

  act(() => resolve('ok'));
  await waitForNextUpdate();

  expect(result.current).toEqual(['ok', undefined, 'resolved']);
});

test('usePromise returns [undefined, error, "rejected"]', async () => {
  const { promise, reject } = deferred();
  const { result, waitForNextUpdate } = renderHook(() =>
    usePromise(promise)
  );

  expect(result.current).toEqual([undefined, undefined, 'pending']);

  act(() => reject('err'));
  await waitForNextUpdate();

  expect(result.current).toEqual([undefined, 'err', 'rejected']);
});

test('usePromise accepts a function that gives a promise', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    usePromise(asyncUniqid())
  );

  expect(result.current).toEqual([undefined, undefined, 'pending']);
  await waitForNextUpdate();
  expect(result.current).toEqual([0, undefined, 'resolved']);
});
