import { useReducer } from 'react';
import { expectIterable, isFunction } from '@fpc/types';

const reducer = (state, update) => (
  isFunction(update)
    ? expectIterable(update(state))
    : [...state, ...update]
);

const init = initialArg => reducer([], initialArg);

export const useArrayState = initialArg =>
  useReducer(reducer, initialArg, init);
