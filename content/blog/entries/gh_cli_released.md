---
title: "自分のリポジトリからリリースがあるリポジトリを取得する"
date: "2022-09-24"
description: "gh api graphqlでクエリを書く"
tags:
  - GitHub CLI
  - GraphQL
---

GitHubのプロフィールのREADMEを自動生成したいと思ってawesome profileとか眺めてた

その中で「自身の管理下にあるリポジトリのreleases一覧を取ってきて自分のプロダクトの直近リリース」として、リスト化しているコードを見かけた

なるほどそういう利用方法もあるなーと思ったのでとりあえず自分でもリリース一覧を出してみた（そんなに多くなかった…）

```graphql
query($endCursor: String) {
  viewer {
    repositories(first: 100, privacy: PUBLIC, after: $endCursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        url
        releases(last:1) {
          totalCount
          nodes {
            name
            publishedAt
            url
          }
        }
      }
    }
  }
}
```

```bash
$ gh api graphql --paginate  -f query="$(cat graphql/releases.graphql)" > releases.json
$ cat releases.json|jq '.data.viewer.repositories.nodes|.[]|select(.releases.totalCount>0)|{repo: .name, url: .url, version: .releases.nodes[0].name, published: .releases.nodes[0].publishedAt}'
.....
.....
.....
{
  "repo": "hatenablog_publisher",
  "url": "https://github.com/swfz/hatenablog_publisher",
  "version": "v0.3.0",
  "published": "2022-05-07T18:34:07Z"
}
{
  "repo": "chrome-extension-google-slide-usertool-comment-stream",
  "url": "https://github.com/swfz/chrome-extension-google-slide-usertool-comment-stream",
  "version": "v2.0.2",
  "published": "2022-08-31T01:38:49Z"
}
{
  "repo": "chrome-extension-copy-markdown-and-hatenablog-embed-link",
  "url": "https://github.com/swfz/chrome-extension-copy-markdown-and-hatenablog-embed-link",
  "version": "v1.0.0",
  "published": "2022-08-24T11:17:08Z"
}
```

`--paginate`を入れているのは、リリースが多くなかったとしてもリポジトリ一覧を呼び出すクエリのため100件以上リポジトリがある場合はページングさせる必要がある

その中から、jqでリリースがあるリポジトリだけ抜き出している

かなり簡単にデータを取ってこれた

GitHub CLI便利だが、CI/CD用途で使うにはチェック対象のリポジトリすべてReadできる権限が必要

Appsで対象リポジトリを限定するとかしないといけないので少し面倒…