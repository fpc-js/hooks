import { useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const init = fn => fn();
const reducer = (_, fn) => fn();

export const usePollingValue = fn => {
  const [value, dispatch] = useReducer(reducer, fn, init);
  expectFunction(fn);

  return [value, () => dispatch(fn)];
};
