import { usePollingPromise } from './usePollingPromise';

/* global fetch */

export const useTextFetch = (resource, init) =>
  usePollingPromise(() => fetch(resource, init).then(resp => resp.text()));
