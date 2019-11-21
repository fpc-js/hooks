import { useFnMemo } from './useFnMemo';
import { usePromise } from './usePromise';

export const useFnPromise = (fn, ...args) => {
  const [promise, update] = useFnMemo(fn, ...args);
  const [value, error] = usePromise(promise);

  return [value, error, update];
};
