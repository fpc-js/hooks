/* global Promise, process */
/* eslint-disable max-len */

const mkHeaders = assoc => ({
  entries: () => assoc,
  keys: () => assoc.map(([key]) => key),
  get: name => assoc.filter(([key]) => key === name)[0],
  has: name => assoc.filter(([key]) => key === name)[0] != null,
});

const mkResponse = data => ({
  ok: true,
  url: data.url,
  status: 200,
  statusText: 'OK',
  redirected: false,
  headers: mkHeaders(data.headers),
  text: () => Promise.resolve(data.body),
  json: () => Promise.resolve(JSON.parse(data.body)),
  clone: () => mkResponse(data),
});

const resp = {
  'https://api.github.com/orgs/fpc-js/repos': mkResponse({
    url: 'https://api.github.com/orgs/fpc-js/repos',
    body: '[{"id":221735351,"node_id":"MDEwOlJlcG9zaXRvcnkyMjE3MzUzNTE=","name":"types","full_name":"fpc-js/types","private":false,"html_url":"https://github.com/fpc-js/types","description":"Dynamic type checking functions","fork":false,"url":"https://api.github.com/repos/fpc-js/types","collaborators_url":"https://api.github.com/repos/fpc-js/types/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/fpc-js/types/teams","hooks_url":"https://api.github.com/repos/fpc-js/types/hooks","issue_events_url":"https://api.github.com/repos/fpc-js/types/issues/events{/number}","events_url":"https://api.github.com/repos/fpc-js/types/events","assignees_url":"https://api.github.com/repos/fpc-js/types/assignees{/user}","branches_url":"https://api.github.com/repos/fpc-js/types/branches{/branch}","tags_url":"https://api.github.com/repos/fpc-js/types/tags","blobs_url":"https://api.github.com/repos/fpc-js/types/git/blobs{/sha}","git_tags_url":"https://api.github.com/repos/fpc-js/types/git/tags{/sha}","git_refs_url":"https://api.github.com/repos/fpc-js/types/git/refs{/sha}","trees_url":"https://api.github.com/repos/fpc-js/types/git/trees{/sha}","statuses_url":"https://api.github.com/repos/fpc-js/types/statuses/{sha}","languages_url":"https://api.github.com/repos/fpc-js/types/languages","stargazers_url":"https://api.github.com/repos/fpc-js/types/stargazers","contributors_url":"https://api.github.com/repos/fpc-js/types/contributors","subscribers_url":"https://api.github.com/repos/fpc-js/types/subscribers","subscription_url":"https://api.github.com/repos/fpc-js/types/subscription","commits_url":"https://api.github.com/repos/fpc-js/types/commits{/sha}","git_commits_url":"https://api.github.com/repos/fpc-js/types/git/commits{/sha}","comments_url":"https://api.github.com/repos/fpc-js/types/comments{/number}","issue_comment_url":"https://api.github.com/repos/fpc-js/types/issues/comments{/number}","contents_url":"https://api.github.com/repos/fpc-js/types/contents/{+path}","compare_url":"https://api.github.com/repos/fpc-js/types/compare/{base}...{head}","merges_url":"https://api.github.com/repos/fpc-js/types/merges","archive_url":"https://api.github.com/repos/fpc-js/types/{archive_format}{/ref}","downloads_url":"https://api.github.com/repos/fpc-js/types/downloads","issues_url":"https://api.github.com/repos/fpc-js/types/issues{/number}","pulls_url":"https://api.github.com/repos/fpc-js/types/pulls{/number}","milestones_url":"https://api.github.com/repos/fpc-js/types/milestones{/number}","notifications_url":"https://api.github.com/repos/fpc-js/types/notifications{?since,all,participating}","labels_url":"https://api.github.com/repos/fpc-js/types/labels{/name}","releases_url":"https://api.github.com/repos/fpc-js/types/releases{/id}","deployments_url":"https://api.github.com/repos/fpc-js/types/deployments","created_at":"2019-11-14T15:59:46Z","updated_at":"2019-11-19T11:53:26Z","pushed_at":"2019-11-19T11:53:24Z","git_url":"git://github.com/fpc-js/types.git","ssh_url":"git@github.com:fpc-js/types.git","clone_url":"https://github.com/fpc-js/types.git","svn_url":"https://github.com/fpc-js/types","homepage":"https://www.npmjs.com/package/@fpc/types","size":289,"stargazers_count":0,"watchers_count":0,"language":"JavaScript","has_issues":true,"has_projects":true,"has_downloads":true,"has_wiki":true,"has_pages":false,"forks_count":0,"mirror_url":null,"archived":false,"disabled":false,"open_issues_count":0,"license":{"key":"gpl-3.0","name":"GNU General Public License v3.0","spdx_id":"GPL-3.0","url":"https://api.github.com/licenses/gpl-3.0","node_id":"MDc6TGljZW5zZTk="},"forks":0,"open_issues":0,"watchers":0,"default_branch":"master","permissions":{"admin":false,"push":false,"pull":true}},{"id":222102628,"node_id":"MDEwOlJlcG9zaXRvcnkyMjIxMDI2Mjg="},{"id":222429513,"node_id":"MDEwOlJlcG9zaXRvcnkyMjI0Mjk1MTM="},{"id":222556486,"node_id":"MDEwOlJlcG9zaXRvcnkyMjI1NTY0ODY="},{"id":222665419,"node_id":"MDEwOlJlcG9zaXRvcnkyMjI2NjU0MTk="}]',
    headers: [
      ['cache-control', 'public, max-age=60, s-maxage=60'],
      ['content-type', 'application/json; charset=utf-8'],
      ['etag', 'W/"d2bee1eaeb9161325d4154cc5d1773d4"'],
      ['x-github-media-type', 'github.v3; format=json'],
      ['x-ratelimit-limit', '60'],
      ['x-ratelimit-remaining', '59'],
      ['x-ratelimit-reset', '1574171726'],
    ],
  }),
};

export const fetchMock = url =>
  new Promise((resolve, reject) =>
    process.nextTick(() => (
      resp[url] == null
        ? reject(new Error('not found'))
        : resolve(resp[url]))
    )
  );
