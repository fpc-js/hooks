import { usePollingValue } from './usePollingValue';
import { usePromise } from './usePromise';

export const usePollingPromise = (fn, initialValue) => {
  const [promise, update] = usePollingValue(fn);
  const [value, error, state] = usePromise(promise);

  return state === 'pending'
    ? [initialValue, undefined, state, update]
    : [value, error, state, update];
};
