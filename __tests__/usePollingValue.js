import { renderHook, act } from '@testing-library/react-hooks';
import { usePollingValue } from '../src';

const uniqid = () => {
  let id = 0;

  /* eslint-disable-next-line no-plusplus */
  return () => id++;
};

test('usePollingValue calls its function immediately', () => {
  const { result } = renderHook(() => usePollingValue(uniqid()));
  const [value] = result.current;

  expect(value).toBe(0);
});

test('usePollingValue returns an update callback', () => {
  const { result } = renderHook(() => usePollingValue(uniqid()));
  const [, update] = result.current;

  act(update);

  const [value] = result.current;
  expect(value).toBe(1);
});

test('usePollingValue calls its function with given argument', () => {
  const fn = jest.fn();

  const { result } = renderHook(() => usePollingValue(fn, 1));
  const [, update] = result.current;

  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0]).toEqual([1]);

  act(() => update(2));

  expect(fn.mock.calls.length).toBe(2);
  expect(fn.mock.calls[1]).toEqual([2]);
});
