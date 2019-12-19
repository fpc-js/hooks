import { useRef, useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const reducer = ({ ref }) => ({ value: ref.current.call(null), ref });

export const useLazy = (fn, defaultValue) => {
  const ref = useRef();
  ref.current = expectFunction(fn);

  const [state, update] = useReducer(reducer, { value: defaultValue, ref });

  return [state.value, update];
};
