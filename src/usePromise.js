import { useState, useEffect } from 'react';
import { Result } from '@fpc/result';

const init = () => [];

export const usePromise = (prom, inputs = [prom]) => {
  const [result, setResult] = useState(init);
  const asyncResult = Result.promise(prom);

  useEffect(() => {
    let cancelled = false;

    asyncResult.then(res => cancelled || setResult(res));

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, inputs);

  return result;
};
