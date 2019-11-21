import { useFnPromise } from './useFnPromise';

/* global fetch */

const jsonFetch = (resource, init) =>
  fetch(resource, init).then(resp => resp.json());

export const useJsonFetch = (resource, init) =>
  useFnPromise(jsonFetch, resource, init);
