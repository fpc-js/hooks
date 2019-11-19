import { useFnPromise } from './useFnPromise';

/* global fetch */

const textFetch = (resource, init) =>
  fetch(resource, init).then(resp => resp.text());

export const useTextFetch = (resource, init) =>
  useFnPromise(textFetch, resource, init);
