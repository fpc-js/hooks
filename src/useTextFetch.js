import { usePollingPromise } from './usePollingPromise.js';

/* global fetch */

export const useTextFetch = (resource, init) =>
  usePollingPromise(() => fetch(resource, init).then(resp => resp.text()));
