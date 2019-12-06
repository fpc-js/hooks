import { usePollingValue } from './usePollingValue';
import { usePromise } from './usePromise';

export const usePollingPromise = (fn, defaultValue) => {
  const [promise, update] = usePollingValue(fn);
  const result = usePromise(promise);
  const [value, error] = result;

  return result.length > 0
    ? [value, error, update]
    : [defaultValue, undefined, update];
};
