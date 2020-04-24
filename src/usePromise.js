import { useState, useEffect } from 'react';
import { isFunction, expectPromise } from '@fpc/types';

const init = () => [undefined, undefined, 'pending'];

export const usePromise = (task, deps) => {
  const [result, setResult] = useState(init);
  let useEffectDeps = deps;

  if (deps == null) {
    useEffectDeps = isFunction(task) ? [] : [task];
  }

  useEffect(() => {
    const promise = isFunction(task) ? task() : task;
    const [,, state] = result;
    let cancelled = false;

    if (state !== 'pending') {
      setResult(init);
    }

    expectPromise(promise).then(
      res => cancelled || setResult([res, undefined, 'resolved']),
      rej => cancelled || setResult([undefined, rej, 'rejected'])
    );

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, useEffectDeps);

  return result;
};
