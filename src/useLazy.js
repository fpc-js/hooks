import { useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const reducer = (_, fn) => fn();

export const useLazy = (fn, defaultValue) => {
  const [value, dispatch] = useReducer(reducer, defaultValue);
  expectFunction(fn);

  return [value, () => dispatch(fn)];
};
