---
title: "GitHub CLIのAPIでpagenationした結果を表示する"
date: "2022-08-04"
description: "--paginate"
tags:
  - GitHub
  - GitHub CLI
  - GraphQL
---

## ドキュメント

[gh api | GitHub CLI](https://cli.github.com/manual/gh_api)

```
In --paginate mode, all pages of results will sequentially be requested until there are no more pages of results. For GraphQL requests, this requires that the original query accepts an $endCursor: String variable and that it fetches the pageInfo{ hasNextPage, endCursor } set of fields from a collection.
```

`gh api` では、レスポンスの量が多い場合は`--paginate`オプションを渡すことでページングして全件取得した結果を返してくれる

## GraphQLの場合

`$endCursor`変数を用意する

ページングさせたいConnection（edges）に対して次のようにクエリを書く

- `after: $endCursor`とcursor指定をする
- `pageInfo.endCursor`,`pageInfo.hasNextPage`を取得する

そして`--paginate`オプションを渡すと自動で全件取得してくれる…すごい

もともとできたのかー!!!って感じだった

今までシェルスクリプトを使って自前で`endCursor`取得して…とやってたので無駄だった

## ことの発端

コミット履歴をGraphQLのAPIを使用して取ろうとして調べていたが`pageInfo.endCursor`の値が`hash 99`というようにスペースが入ってしまっている状態だった

これをそのままCLI経由で渡すとうまくいかなかった

シェルスクリプト側の問題のはずだったが一応回避策などないか調べてたらオプションあるやんけ!となった次第

- エラー内容

```
accepts 1 arg(s), received 2
```

## サンプルのGraphQLクエリ

```graphql
query($endCursor: String, $org: String!, $repo: String!) {
  repository(owner: $org, name: $repo) {
    id
    defaultBranchRef {
      name
      target {
        ... on Commit {
          history(after: $endCursor) {
            pageInfo {
              startCursor
              hasNextPage
              endCursor
            }
            nodes {
              id
              pushedDate
              message
            }
          }
        }
      }
    }
  }
}
```

## 結果

```json
{
  "data": {
    "repository": {
      "id": "hogehoge",
      "defaultBranchRef": {
        "name": "master",
        "target": {
          "history": {
            "pageInfo": {
              "startCursor": "hogehoge 0",
              "hasNextPage": true,
              "endCursor": "hogehoge 99"
            },
            "nodes": [
              {
                "id": "C_aaaaa",
                "pushedDate": "2022-08-01T06:44:36Z",
                "message": "Merge branch 'feature/fuga"
              }
              .....
              .....
              .....
              .....
              .....
            ]
          }
        }
      }
    }
  }
}
{
  "data": {
    "repository": {
      .....
      .....
      .....
      .....
      .....
    }
  }
}
```

jqで展開するとこんな感じ

実際は改行なしでレスポンスのデータをつなげた状態で出力される
