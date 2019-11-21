import { useState, useEffect } from 'react';
import { Result, Ok } from '@fpc/result';
import { expectPromise } from '@fpc/types';

export const usePromise = promise => {
  expectPromise(promise);

  const [result, setResult] = useState(Ok);

  useEffect(() => {
    let cancelled = false;

    Result(promise).then(res => cancelled || setResult(res));

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, [promise]);

  return result;
};
