import { useRef, useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const stateFromRef = ref =>
  ({ value: ref.current.fn.apply(null, ref.current.args), ref });

const stateReducer = state => stateFromRef(state.ref);

export const useFnMemo = (fn, ...args) => {
  const ref = useRef();
  ref.current = { fn: expectFunction(fn), args };

  const [state, update] = useReducer(stateReducer, ref, stateFromRef);

  return [state.value, update];
};
