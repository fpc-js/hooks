import { renderHook } from '@testing-library/react-hooks';
import { useTextFetch } from '../src/index.js';
import { fetchMock } from '../__mocks__/fetch.js';

/* global global */

global.fetch = fetchMock;

test('useTextFetch gives the response body', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useTextFetch('https://api.github.com/orgs/fpc-js/repos')
  );

  await waitForNextUpdate();

  const [text, err] = result.current;

  expect(typeof text).toBe('string');
  expect(err).toBe(undefined);
});
