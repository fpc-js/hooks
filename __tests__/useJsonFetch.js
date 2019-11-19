import { renderHook } from '@testing-library/react-hooks';
import { useJsonFetch } from '../src';
import { fetchMock } from 'fetch';

/* global global */

global.fetch = fetchMock;

test('useJsonFetch parses json from response', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useJsonFetch('https://api.github.com/orgs/fpc-js/repos')
  );

  await waitForNextUpdate();

  const [json, err] = result.current;

  expect(json.length).toBeGreaterThan(0);
  expect(err).toBe(undefined);
});
