---
title: "GitHub CLIでStarのカウント集計を出す"
date: "2023-01-14"
description: "gh repo"
tags:
  - GitHub CLI
  - jq
---

GitHubで自分のリポジトリにStarやWatch、Forkなどのイベントがあると励みになる

たまに全体を見渡してみたらどんな感じなんだろうということでGitHub CLIのコマンドとjqでリストを出したりするのでその際のコマンドのメモ

`--limit 200`の値の部分は対象リポジトリすべてを出せるくらいの数値にする（default: 30）

## リポジトリごとのwatchしている人カウント（自分含む）

```shell
$ gh repo list --limit 200 --json 'name,watchers' | jq 'reduce .[] as $row ({}; .[$row.name] += $row.watchers.totalCount)'
{
  "til": 2,
  "hatenablog_publisher": 2,
  "gh-annotations": 2,
  .....
  .....
  .....
}
```

## リポジトリごとのStarカウント

```shell
$ gh repo list --limit 200 --json 'name,stargazerCount' | jq 'reduce .[] as $row ({}; .[$row.name] += $row.stargazerCount)'
{
  "tools": 3,
  "dotfiles": 4,
  "gh-annotations": 2,
  .....
  .....
  .....
}
```

## 各種数値でソートと出力結果の整形

- star

```shell
$ gh repo list --limit 200 --json 'name,stargazerCount,watchers,forkCount' | jq -cr 'sort_by(.stargazerCount)|reverse|.[]|{star: .stargazerCount, name: .name}'
{"star":4,"name":"dotfiles"}
{"star":3,"name":"tools"}
{"star":3,"name":"til"}
{"star":2,"name":"mkdocs_sample"}
{"star":2,"name":"docker-mkdocs"}
{"star":2,"name":"gh-annotations"}
```

- fork

```shell
$ gh repo list --limit 200 --json 'name,stargazerCount,watchers,forkCount' | jq -cr 'sort_by(.forkCount)|reverse|.[]|{fork: .forkCount, name: .name}'
{"fork":3,"name":"hatenablog_publisher"}
{"fork":2,"name":"ansible-plenv"}
{"fork":2,"name":"angular2-es-raw-search"}
{"fork":2,"name":"shared-count"}
{"fork":2,"name":"tools"}
```

- watch

```shell
gh repo list --limit 200 --json 'name,stargazerCount,watchers,forkCount' | jq -cr 'sort_by(.watchers.totalCount)|reverse|.[]|{watch: .watchers.totalCount, name: .name}'
{"watch":4,"name":"docker-mkdocs"}
{"watch":3,"name":"twitter2slack"}
{"watch":3,"name":"bookmarklets"}
```
