import { useReducer } from 'react';
import { expectObject, isFunction } from '@fpc/types';

const reducer = (state, update) => (
  isFunction(update)
    ? expectObject(update(state))
    : { ...state, ...update }
);

export const useMergingState = obj =>
  useReducer(reducer, obj, expectObject);
