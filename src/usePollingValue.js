import { useRef, useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const poll = ref =>
  ({ value: ref.current.call(null), ref });

const reducer = state => poll(state.ref);

export const usePollingValue = fn => {
  const ref = useRef();
  ref.current = expectFunction(fn);

  const [state, update] = useReducer(reducer, ref, poll);

  return [state.value, update];
};
