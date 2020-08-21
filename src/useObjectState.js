import { useReducer } from 'react';
import { expectObject, isFunction } from '@fpc/types';

const reducer = (state, update) => (
  isFunction(update)
    ? expectObject(update(state))
    : { ...state, ...update }
);

const init = initialArg => reducer({}, initialArg);

export const useObjectState = initialArg =>
  useReducer(reducer, initialArg, init);
