---
title: "GitHub CLIでGraphQLのオプショナルな引数を扱う"
date: "2022-01-08"
description: "!と-fを使う"
tags:
  - GraphQL
  - GitHub CLI
---

GitHubのCLIからGitHubのAPIをたたくことができる

最近知って便利でよく使っているが、GitHub CLIのオプションを使って特定のパラメータを渡す場合と渡さない場合どちらも同じGraphQLのクエリを使いたいというパターンの話

具体的に言うと件数が100件以上ある場合、GitHubのAPIだと100件が上限なので2回目以降のリクエストで`endCursor`の値を渡して`after`に指定する必要がある

`cursor`の値を渡す場合と渡さない場合でもクエリは統一して扱いたい

- projects.graphql

```graphql
query($projectId: ID! $cursor: String){
  node(id: $projectId) {
    ... on ProjectNext {
      items(first: 100, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes{
          title
          id
          updatedAt
          fieldValues(first: 8) {
            nodes{
              value
              projectField{
                name
              }
            }
          }
        }
      }
    }
  }
}
```

値が必須かどうかは`!`をつけるかで変わる

この場合`ID!`となっているので`$projectId`は必須パラメータ、`$cursor`はオプショナルなパラメータ（null許容）

実際のコマンドは下記(環境変数として`GITHUB_PROJECT_ID`を定義済みの前提)

- 引数あり（cursor付き）

```graphql
gh api graphql -f query="$(cat projects.graphql)" -f projectId=${GITHUB_PROJECT_ID} -f cursor=hogehoge
```

- 引数なし（cursorなし）

```graphql
gh api graphql -f query="$(cat projects.graphql)" -f projectId=${GITHUB_PROJECT_ID}
```

どちらもエラーにならず結果が返ってくる