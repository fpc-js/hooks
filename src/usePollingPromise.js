import { usePollingValue } from './usePollingValue.js';
import { usePromise } from './usePromise.js';

export const usePollingPromise = (fn, initialValue) => {
  const [promise, update] = usePollingValue(fn);
  const [value, error, state] = usePromise(promise);

  return state === 'pending'
    ? [initialValue, undefined, state, update]
    : [value, error, state, update];
};
