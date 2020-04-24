import { useReducer } from 'react';
import { expectFunction } from '@fpc/types';

const init = value => ({ value });
const reducer = ({ fn }) => ({ value: fn() });

export const useLazy = (fn, defaultValue) => {
  const [state, dispatch] = useReducer(reducer, defaultValue, init);
  state.fn = expectFunction(fn);

  return [state.value, dispatch];
};
