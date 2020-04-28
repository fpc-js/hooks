import { usePollingValue } from './usePollingValue';
import { usePromise } from './usePromise';

export const usePollingPromise = (fn, defaultValue) => {
  const [promise, update] = usePollingValue(fn);
  const [value, error, state] = usePromise(promise);

  return state === 'pending'
    ? [defaultValue, undefined, state, update]
    : [value, error, state, update];
};
