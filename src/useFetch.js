import { usePollingValue } from './usePollingValue';

/* global fetch */

export const useFetch = (resource, init) =>
  usePollingValue(() => fetch(resource, init));
