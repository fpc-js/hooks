import { useState, useEffect } from 'react';
import { isFunction, expectPromise } from '@fpc/types';

const init = () => [undefined, undefined, 'pending'];

export const usePromise = (task, deps = isFunction(task) ? [] : [task]) => {
  const [result, setResult] = useState(init);

  useEffect(() => {
    const promise = isFunction(task) ? task() : task;
    const [,, state] = result;
    let cancelled = false;

    if (state !== 'pending') {
      setResult(init);
    }

    expectPromise(promise).then(
      val => cancelled || setResult([val, undefined, 'resolved']),
      err => cancelled || setResult([undefined, err, 'rejected'])
    );

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, deps);

  return result;
};
