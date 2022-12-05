# @fpc/hooks

<div align="center">
  <a href="https://drone.tno.sh/fpc-js/hooks" target="_blank">
    <img src="https://drone.tno.sh/api/badges/fpc-js/hooks/status.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://snyk.io/test/github/fpc-js/hooks?targetFile=package.json">
    <img src="https://snyk.io/test/github/fpc-js/hooks/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/fpc-js/hooks?targetFile=package.json" style="max-width:100%;">
  </a>
  <a href="https://codecov.io/gh/fpc-js/hooks" target="_blank">
    <img src="https://codecov.io/gh/fpc-js/hooks/branch/master/graph/badge.svg?token=3955OGT44X" alt="Coverage Status">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
</div>

Collection of general purpose [React Hooks](https://reactjs.org/docs/hooks-intro.html).

## API

### useArrayState

```javascript
import { useArrayState } from '@fpc/hooks';

const [data, updateData] = useArrayState(initialArg);
```

`initialArg` must be an [iterable](https://github.com/fpc-js/types#user-content-isiterable)
or a function that returns an iterable that is used to initialize `data`
for the initial render.

`updateData` accepts an iterable `iter` or a function `fn`
that returns an iterable.

- In the former case a re-render will be triggered and
the new data will be `[ ...data, ...iter ]`.
- If `updateData` receives `fn` the data in the next render will be `fn(data)`.

<blockquote>
<strong>Note</strong>
<br>
<code>updateData</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### useFetch

```javascript
import { useFetch } from '@fpc/hooks';

const [fetchResponsePromise, refetch] = useFetch(resource, init);
```

`resource`, `init` and `fetchResponsePromise` have the same semantic of browser
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch),
`refetch` is a function that can be called to fetch again the given resource
and trigger a re-render.

⚠ Be careful about render loops ⚠

```javascript
import React from 'react';
import { useFetch, usePromise } from '@fpc/hooks';

function App() {
  const [responsePromise, refetch] = useFetch(myResource);
  const [res, err, status] = usePromise(responsePromise.then(res => res.text()));

  return <p>{res}</p>;
}
```

This will cause a render loop because `responsePromise.then()` will produce a new
`Promise` at each render that will trigger a re-render.

What you need to do is:

- Wrap the promise in a function `() => responsePromise.then(res => res.text())`
- Pass the reference of the promise before `then` in `usePromise`'s dependency list

```javascript
function App() {
  const [response, refetch] = useFetch(myResource);
  const [res, err, status] = usePromise(() =>
      response.then(res => res.text())
    , [response]);

  return <p>{res}</p>;
}
```

<blockquote>
<strong>Note</strong>
<br>
<code>refetch</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### useJsonFetch

As you see in [useFetch](#user-content-usefetch) deal with promises can be
non-trivial, but since most of the time you just want `response.text()`
or `response.json()` these utilities make life a bit easier:

```javascript
import React from 'react';
import { useJsonFetch } from '@fpc/hooks';

function App() {
  const [json, err, status, refetch] = useJsonFetch(myResource);

  return <p>{JSON.stringify(json)}</p>;
}
```

- `json` is either `undefined` or the parsed response
- `err` is `undefined` or contains an error
- `status` is one of `'pending'`, `'resolved'` or `'rejected'`
- `refetch` can be called to re-trigger the network request and re-render

<blockquote>
<strong>Note</strong>
<br>
<code>refetch</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### useLazy

```javascript
import { useLazy } from '@fpc/hooks';

const [value, update] = useLazy(fn, initialValue);
```

During the initial render `value` will be `initialValue` (`undefined` if not passed).
Calling the `update` function will trigger a re-render with `value` setted to `fn()`.

<blockquote>
<strong>Note</strong>
<br>
<code>update</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### useLazyPromise

```javascript
import { useLazyPromise } from '@fpc/hooks';

const [value, error, state, update] = useLazyPromise(fn, initialValue);
```

- `fn` must be a function that returns a [thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#Thenable_objects)
- `initialValue` is optional and `undefined` by default,
  it's used as `value` for the first render
- `value` is `initialValue` until `update` is called,
  then will be `undefined` until the promise is resolved
- `error` is either `undefined` or contains the promise's error
- `state` is `'idle'` until `update` is called for the first time,
  then is `'pending'` and finally `'resolved'` or `'rejected'`
- `update` is a function that will trigger a call to `fn` and a re-render

<blockquote>
<strong>Note</strong>
<br>
<code>update</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### useObjectState

```javascript
import { useObjectState } from '@fpc/hooks';

const [state, updateState] = useObjectState(initialArg);
```

`initialArg` must be an object or a function that returns an object
that is used to initialize `state` for the initial render.

`updateState` accepts an object `obj` or a function `fn`
that returns an object.

- In the former case a re-render will be triggered and
the new `state` will be `{ ...state, ...obj }`.
- If `updateState` receives `fn` the `state` in the next render will be `fn(data)`.

<blockquote>
<strong>Note</strong>
<br>
<code>updateState</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### usePollingPromise

```javascript
import { usePollingPromise } from '@fpc/hooks';

const [value, error, status, update] = usePollingPromise(fn, initialValue);
```

- `fn` must be a function that returns a [thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#Thenable_objects)
- `initialValue` is optional and `undefined` by default,
  it's used as `value` for the first render
- `value` is `initialValue` until the promise is resolved
- `error` is either `undefined` or contains the promise's error
- `status` is one of `'pending'`, `'resolved'` or `'rejected'`
- `update` will trigger a new call to `fn`, restart the promise resolving and
  re-render

<blockquote>
<strong>Note</strong>
<br>
<code>update</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### usePollingValue

```javascript
import { usePollingValue } from '@fpc/hooks';

const [value, update] = usePollingValue(fn);
```

During the first render `value` is `fn()`. The `update` function can be called
to produce a new `value` and trigger a re-render.

<blockquote>
<strong>Note</strong>
<br>
<code>update</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>

### usePromise

```javascript
import { usePromise } from '@fpc/hooks';

const [value, error, status] = usePromise(task, deps);
```

- `task` can be a [thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#Thenable_objects)
or a function that returns a thenable.
- `deps` is an optional dependency array, just like the [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)'s one
- `value` is `undefined` or contains the value of the promise
- `error` is either `undefined` or contains the promise's error
- `status` is one of `'pending'`, `'resolved'` or `'rejected'`

### useTextFetch

```javascript
import React from 'react';
import { useTextFetch } from '@fpc/hooks';

function App() {
  const [text, err, status, refetch] = useTextFetch(myResource);

  return <p>{text}</p>;
}
```

- `text` is either `undefined` or the response body
- `err` is `undefined` or contains an error
- `status` is one of `'pending'`, `'resolved'` or `'rejected'`
- `refetch` can be called to re-trigger the network request and re-render

<blockquote>
<strong>Note</strong>
<br>
<code>refetch</code> function identity is stable and won't change on re-renders
just like <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>'s <code>dispatch</code>.
</blockquote>
