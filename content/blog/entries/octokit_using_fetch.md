---
title: "GitHub ActionsのOctokitでfetchを使いリクエストする"
date: "2024-01-10"
description: "requestライブラリを指定する"
tags:
  - GitHubActions
  - Octokit
  - TypeScript
  - msw
---

GitHub Actionsのカスタムアクションの開発をしていてエラーに遭遇したのでメモ

`@actions/github`の`getOctokit`を使ってoctokitを呼び出して使うと`msw`によるAPI通信のモックが行えない

- 動作環境

```
@actions/github@6.0.0
msw@2.0.14
node@21.2.0
octokit@3.1.2
```

- テスト対象コード

```typescript
export async function getWorkflowRun(
  octokit: Octokit,
  runId: number
): Promise<WorkflowRun> {
  const { data } = await octokit.rest.actions.getWorkflowRun({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: runId
  })
  core.debug('fetched workflow run')

  return data
}
```

- テストコード一部抜粋

```typescript
import { getOctokit } from '@actions/github'

  const octokit = getOctokit('dummy')
  it('getWorkflowRun', async () => {
    const workflowRun = await getWorkflowRun(octokit, 1)

    expect(workflowRun.id).toEqual(30433642)
  })
```

- mswのhandler一部抜粋

```typescript
import workflowRun from './responses/workflow_run.json'
export const handlers = [
  http.get('https://api.github.com/repos/*/*/actions/runs/*', () => {
    return HttpResponse.json(workflowRun)
  }),
]
```

mswのモックの設定を行いテストを実行してみたが下記のようにエラーが発生する状態だった

```shell
> typescript-action@0.0.0 test
> jest __tests__/main.test.ts

  console.warn
    Deprecation: [@octokit/request-error] `error.code` is deprecated, use `error.status`.
        at RequestError.get (/home/user/gh/self/failed-log-to-slack-action/node_modules/@octokit/request-error/dist-node/index.js:70:11)
        at isAssertionError (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/formatNodeAssertErrors.js:179:13)
        at /home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/formatNodeAssertErrors.js:58:14
        at Array.map (<anonymous>)
        at formatNodeAssertErrors (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/formatNodeAssertErrors.js:39:43)
        at dispatch (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/state.js:67:11)
        at processTicksAndRejections (node:internal/process/task_queues:95:5)
        at _runTest (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/run.js:264:3)
        at _runTestsForDescribeBlock (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/run.js:126:9)
        at _runTestsForDescribeBlock (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/run.js:121:9)
        at run (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/run.js:71:3)
        at runAndTransformResultsToJestFormat (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)
        at jestAdapter (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
        at runTestInternal (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-runner/build/runTest.js:367:16)
        at runTest (/home/user/gh/self/failed-log-to-slack-action/node_modules/jest-runner/build/runTest.js:444:34)

      at node_modules/@octokit/request-error/dist-node/index.js:38:69
      at f (node_modules/once/once.js:25:25)
      at RequestError.get (node_modules/@octokit/request-error/dist-node/index.js:69:9)
          at Array.map (<anonymous>)

 FAIL  __tests__/main.test.ts (5.021 s)
  sample
    ✓ hoge (17 ms)
    ✕ github (269 ms)
  action
    ○ skipped sets the time output
    ○ skipped sets a failed status

  ● sample › github

    HttpError: Bad credentials

      34 |   runId: number
      35 | ): Promise<WorkflowRun> {
    > 36 |   const { data } = await octokit.rest.actions.getWorkflowRun({
         |                    ^
      37 |     owner: context.repo.owner,
      38 |     repo: context.repo.repo,
      39 |     run_id: runId

      at node_modules/@octokit/request/dist-node/index.js:124:21
      at getWorkflowRun (src/github.ts:36:20)
      at Object.<anonymous> (__tests__/main.test.ts:48:20)
```

`Bad credentials`といわれていて、mswでモックしているはずなのにGitHubに通信が行ってしまっている

調べてみると、下記の参考Issueが見つかった

[Unit testing: Bad credentials error · Issue #1115 · actions/toolkit](https://github.com/actions/toolkit/issues/1115)

<!-- textlint-disable prh -->
defaultではfetchやaxiosではないラッパーライブラリを使ってリクエストしているのでmswやnockなどはモックできない
<!-- textlint-enable prh -->

Issueに掲載されている例とは若干違うが次のようにしたらモックできた

```typescript
  it('github', async () => {
    const octokit = getOctokit('dummy', {request: fetch})
    const result = await getWorkflowRun(octokit, 1)
    console.log(result);
  })
```

`getOctokit('dummy', {request: fetch})`でrequestに使うモジュールを指定できる

fetchでAPIへリクエストするようにOptionを渡すことでmswが通信をモックできるようになる
