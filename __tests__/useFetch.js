import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from '../src';
import { fetchMock } from 'fetch';

/* global global */
/* eslint-disable no-magic-numbers */

global.fetch = fetchMock;

test('useFetch gives status code 200 in response object', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch('https://api.github.com/orgs/fpc-js/repos')
  );

  const [resp1, err1] = result.current;

  expect(resp1).toBe(undefined);
  expect(err1).toBe(undefined);

  await waitForNextUpdate();

  const [resp2, err2] = result.current;

  expect(resp2.status).toBe(200);
  expect(err2).toBe(undefined);
});
