import { useState, useEffect } from 'react';

const init = () => [undefined, undefined, 'pending'];

export const usePromise = (promise, inputs = [promise]) => {
  const [result, setResult] = useState(init);

  useEffect(() => {
    let cancelled = false;

    promise.then(
      res => cancelled || setResult([res, undefined, 'resolved']),
      rej => cancelled || setResult([undefined, rej, 'rejected'])
    );

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, inputs);

  return result;
};
