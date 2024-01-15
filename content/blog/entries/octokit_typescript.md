---
title: "Octokitで扱うAPIのレスポンスの型定義"
date: "2024-01-15"
description: ""
tags:
  - TypeScript
  - Octokit
  - GitHub
---

Octokitを使ってGitHubのAPIを叩いてデータを取得する

TypeScriptで開発してたのでしっかり型付けを行いたい

[octokit/types.ts: Shared TypeScript definitions for Octokit projects](https://github.com/octokit/types.ts)

これ参照するのがよい?

```shell
npm i -D @octokit/types
```

README読んだが`octokit`を変数化して`octokit`に生えているメソッドから返ってくる型を特定する方法だった

できれば変数から型情報を抜き出すのはやりたくないので少し調べた

使い方のバリエーションとしてほかにもありそうかなということで、GitHub検索で探したら参考になりそうなコードが出てきた

[参考](https://github.com/thdk/cloud-build-monitor/blob/7ab37b33e3c72d3ad109a49ab04bbbae57bf8e1c/packages/app/components/repo-list/repo-list.tsx#L14)

`import type { Octokit } from "@octokit/rest";`とあるように`Octokit`の型情報が存在するようなのでそこからたどって行けそう

結局下記のような感じでデータの取得方法と対応した型定義の呼び出し方で定義できた

- 一部抜粋

```typescript
export type Octokit = ReturnType<typeof getOctokit>
export type Jobs = GetResponseDataTypeFromEndpointMethod<
  Octokit['rest']['actions']['listJobsForWorkflowRun']
>['jobs']
export type Annotations = GetResponseDataTypeFromEndpointMethod<
  Octokit['rest']['checks']['listAnnotations']
>

export async function getFailedJobs(
  octokit: Octokit,
  runId: number
): Promise<Jobs> {
  const { data } = await octokit.rest.actions.listJobsForWorkflowRun({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: runId
  })

  const completedJobs = data.jobs.filter(j => j.status === 'completed')
  const failedJobs = completedJobs.filter(j => j.conclusion === 'failure')

  return failedJobs || []
}

export async function getJobAnnotations(
  octokit: Octokit,
  jobId: number
): Promise<Annotations> {
  const { data } = await octokit.rest.checks.listAnnotations({
    owner: context.repo.owner,
    repo: context.repo.repo,
    check_run_id: jobId
  })

  return data
}
```

`GetResponseDataTypeFromEndpointMethod`が便利
