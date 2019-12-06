import { useReducer } from 'react';
import { expectObject, isFunction } from '@fpc/types';

const updatingStateReducer = (state, update) => (
  isFunction(update)
    ? expectObject(update(state))
    : { ...state, ...update }
);

export const useUpdatingState = obj =>
  useReducer(updatingStateReducer, obj, expectObject);
