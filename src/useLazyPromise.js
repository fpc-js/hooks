import { useState, useRef } from 'react';
import { expectFunction, expectPromise } from '@fpc/types';

const idle = () => [undefined, undefined, 'idle'];
const pending = () => [undefined, undefined, 'pending'];

export const useLazyPromise = (fn, initialValue) => {
  const [result, setResult] = useState(idle);
  const [value, error, state] = result;

  const ref = useRef(() => {
    if (ref.current.state !== 'pending') {
      setResult(pending);
    }

    expectPromise(ref.current.fn.call(null)).then(
      val => setResult([val, undefined, 'resolved']),
      err => setResult([undefined, err, 'rejected'])
    );
  });

  const update = ref.current;
  update.state = state;
  update.fn = expectFunction(fn);

  return state === 'idle'
    ? [initialValue, undefined, 'idle', update]
    : [value, error, state, update];
};
