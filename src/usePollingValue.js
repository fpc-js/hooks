import { useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const init = fn => ({ value: fn() });
const reducer = ({ fn }) => ({ value: fn() });

export const usePollingValue = fn => {
  const [state, dispatch] = useReducer(reducer, fn, init);
  state.fn = expectFunction(fn);

  return [state.value, dispatch];
};
