import { usePollingPromise } from './usePollingPromise';

/* global fetch */

export const useJsonFetch = (resource, init) =>
  usePollingPromise(() => fetch(resource, init).then(resp => resp.json()));
