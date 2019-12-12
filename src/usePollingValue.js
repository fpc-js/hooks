import { useLazy } from './useLazy';

export const usePollingValue = fn => useLazy(fn, fn());
