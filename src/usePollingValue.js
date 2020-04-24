import { useState } from 'react';
import { expectFunction } from '@fpc/types';
import { useLazy } from './useLazy';

export const usePollingValue = fn => {
  const [initialValue] = useState(expectFunction(fn));

  return useLazy(fn, initialValue);
};
