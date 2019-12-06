import { useRef, useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const poll = ({ ref, arg }) => ({ value: ref.current.call(null, arg), ref });
const reducer = ({ ref }, arg) => poll({ ref, arg });

export const usePollingValue = (fn, arg) => {
  const ref = useRef();
  ref.current = expectFunction(fn);

  const [state, update] = useReducer(reducer, { ref, arg }, poll);

  return [state.value, update];
};
