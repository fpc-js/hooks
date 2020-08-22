import { useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const init = value => ({ value });
const reducer = ({ fn }) => ({ value: fn() });

export const useLazy = (fn, initialValue) => {
  const [state, dispatch] = useReducer(reducer, initialValue, init);
  state.fn = expectFunction(fn);

  return [state.value, dispatch];
};
