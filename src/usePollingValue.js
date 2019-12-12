import { useRef, useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const evaluate = ref => ({ value: ref.current.call(null), ref });
const reducer = ({ ref }) => evaluate(ref);

export const usePollingValue = fn => {
  const ref = useRef();
  ref.current = expectFunction(fn);

  const [state, update] = useReducer(reducer, ref, evaluate);

  return [state.value, update];
};
