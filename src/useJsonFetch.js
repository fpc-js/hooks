import { usePollingPromise } from './usePollingPromise.js';

/* global fetch */

export const useJsonFetch = (resource, init) =>
  usePollingPromise(() => fetch(resource, init).then(resp => resp.json()));
