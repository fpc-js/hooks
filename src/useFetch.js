import { usePollingValue } from './usePollingValue.js';

/* global fetch */

export const useFetch = (resource, init) =>
  usePollingValue(() => fetch(resource, init));
