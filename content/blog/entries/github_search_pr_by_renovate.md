---
title: "管理下のリポジトリリストからRenovateのPRを集計する"
date: "2023-09-20"
description: "app/renovate"
tags:
  - Renovate
  - GitHub CLI
---

リポジトリごとのRenovatePR数を集計する

```shell
$ gh repo list --limit 200 --json 'nameWithOwner' | jq -rc '.[]|.nameWithOwner' | xargs -i sh -lc "gh pr list -R {} -S 'author:app/renovate' --json 'title,url'| jq '.[]|.repo|=\"{}\"'"  | tee -a pull_requests.json
$ cat pull_requests.json | jq -s 'group_by(.repo)|map({"repo": .[0].repo, "count": [.[]]|length}) | sort_by(.count)'
```

## リポジトリのリスト

まず自身の管理化のリポジトリリストを出す

```shell
$ gh repo list --limit 200 --json 'nameWithOwner' | jq -rc '.[]|.nameWithOwner'
swfz/tools
swfz/memo
swfz/deno-kusa-image
swfz/article-search
swfz/chrome-extension-google-slide-usertool-comment-stream
swfz/deno-terminal-image
swfz/til
swfz/dotfiles
```

## 各リポジトリごとにPullRequestのリストを出す

とりあえずタイトルとURLは必要かなということで出力

`gh pr list`の`-S`オプションでブラウザでの検索条件と同様のクエリを指定できる、GitHub Appのユーザーは`app/renovate`のように指定するみたい

[Searching issues and pull requests - GitHub Docs](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-author)

`author:app/renovate`

これは知らなかった

repoの値だけ`gh pr list`のJSON出力するオプションがなさそうだったのでxargsで受け取った引数を無理やり入れ込んでる

- pull_requests.json

```json
{
  "title": "chore(deps): update gatsby monorepo",
  "url": "https://github.com/swfz/til/pull/1585",
  "repo": "swfz/til"
}
{
  "title": "chore(deps): update dependency @types/node to v20.7.0",
  "url": "https://github.com/swfz/deno-kusa-image/pull/15",
  "repo": "swfz/deno-kusa-image"
}
{
  "title": "chore(deps): update dependency @babel/core to v7.23.0",
  "url": "https://github.com/swfz/tools/pull/658",
  "repo": "swfz/tools"
}
```

## 集計する

後半はgroup by count的なことをしている

`pull_requests.json`の状態のJSONファイル（厳密にはJSONではないが）をjqで読み込む際は`-s`をつけて全体を配列として扱う

- 一部抜粋した結果

```shell
$ cat pull_requests.json | jq -s 'group_by(.repo)|map({"repo": .[0].repo, "count": [.[]]|length}) | sort_by(.count)'
[
  .....
  .....
  .....
  {
    "repo": "swfz/gh-annotations",
    "count": 6
  },
  {
    "repo": "swfz/chrome-extension-copy-markdown-and-hatenablog-embed-link",
    "count": 10
  },
  {
    "repo": "swfz/tools",
    "count": 11
  },
  {
    "repo": "swfz/dotfiles",
    "count": 14
  }
]
```

PullRequest数の昇順
