import { useRef, useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const evaluate = ref => ({ value: ref.current.call(null), ref });
const reducer = ({ ref }) => evaluate(ref);

export const useLazy = (fn, defaultValue) => {
  const ref = useRef();
  ref.current = expectFunction(fn);

  const [state, update] = useReducer(reducer, { value: defaultValue, ref });

  return [state.value, update];
};
