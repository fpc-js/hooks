import { renderHook, act } from '@testing-library/react-hooks';
import { useFnMemo } from '../src';

const uniqid = () => {
  let id = 0;

  /* eslint-disable-next-line no-plusplus */
  return () => id++;
};

test('useFnMemo calls its function immediately', () => {
  const { result } = renderHook(() => useFnMemo(uniqid()));
  const [value] = result.current;

  expect(value).toBe(0);
});

test('useFnMemo returns an update callback', () => {
  const { result } = renderHook(() => useFnMemo(uniqid()));
  const [, update] = result.current;

  act(update);

  const [value] = result.current;
  expect(value).toBe(1);
});
