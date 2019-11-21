import { useFnMemo } from './useFnMemo';

/* global fetch */

export const useFetch = (resource, init) =>
  useFnMemo(fetch, resource, init);
