import { useFnPromise } from './useFnPromise';

/* global fetch */

export const useFetch = (resource, init) =>
  useFnPromise(fetch, resource, init);
