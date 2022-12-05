import { renderHook, act } from '@testing-library/react-hooks';
import { useLazy } from '../src/index.js';
import { jest } from '@jest/globals';

const uniqid = () => {
  let id = 0;

  /* eslint-disable-next-line no-plusplus */
  return () => id++;
};

test('useLazy does not call its function immediately', () => {
  const fn = jest.fn();
  renderHook(() => useLazy(fn));

  expect(fn.mock.calls.length).toBe(0);
});

test('useLazy accepts a default value', () => {
  const { result } = renderHook(() => useLazy(() => {}, 1));
  const [value] = result.current;

  expect(value).toBe(1);
});

test('useLazy returns an update callback', () => {
  const { result } = renderHook(() => useLazy(uniqid()));
  const [, update] = result.current;

  act(update);

  const [value] = result.current;
  expect(value).toBe(0);
});
