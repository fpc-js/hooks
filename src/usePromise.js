import { useState, useEffect } from 'react';
import { Result, Ok } from '@fpc/result';

const init = () => {
  const pendingRes = Ok();
  pendingRes.length = 0;

  return pendingRes;
};

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
