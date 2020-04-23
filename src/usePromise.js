import { useState, useEffect } from 'react';
import { expectPromise } from '@fpc/types';

const init = () => [undefined, undefined, 'pending'];

export const usePromise = (promise, inputs = [promise]) => {
  const [result, setResult] = useState(init);

  useEffect(() => {
    let cancelled = false;

    expectPromise(promise).then(
      res => cancelled || setResult([res, undefined, 'resolved']),
      rej => cancelled || setResult([undefined, rej, 'rejected'])
    );

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, inputs);

  return result;
};
