import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from '../src/index.js';
import { fetchMock } from '../__mocks__/fetch.js';

/* global global, Promise */
/* eslint-disable no-magic-numbers */

global.fetch = fetchMock;

test('useFetch gives an array with a promise', () => {
  const { result } = renderHook(() =>
    useFetch('https://api.github.com/orgs/fpc-js/repos')
  );

  const [prom] = result.current;
  expect(prom).toBeInstanceOf(Promise);
});

test('useFetch gives status code 200 in response object', async () => {
  const { result } = renderHook(() =>
    useFetch('https://api.github.com/orgs/fpc-js/repos')
  );

  const [prom] = result.current;
  const resp = await prom;
  expect(resp.status).toBe(200);
});
