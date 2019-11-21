import { useState, useEffect } from 'react';
import { Result, Ok } from '@fpc/result';

export const usePromise = (promise, inputs = [promise]) => {
  const [result, setResult] = useState(Ok);
  const resultPromise = Result(promise);

  useEffect(() => {
    let cancelled = false;

    resultPromise.then(res => cancelled || setResult(res));

    /* eslint-disable-next-line no-return-assign */
    return () => cancelled = true;
  }, inputs);

  return result;
};
