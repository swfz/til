---
title: "SlackにGitHubの更新通知を行う"
date: "2022-10-14"
description: "Apps or RSS"
tags:
  - Slack
  - GitHub
  - RSS
---

## SlackApp

```
/github help
```

を読めばOK

さらに詳しく知る場合はドキュメントを当たる

[integrations/slack: Bring your code to the conversations you care about with the GitHub and Slack integration](https://github.com/integrations/slack#subscribe-to-an-organization-or-a-repository)

いくつかやったことを残しておく

### 特定のラベルがついたPull Requestを通知

```
/github subscribe swfz/til pulls +label:"article"
```

2022-10-15現在、ラベルは1つしかサポートしていないよう

### 特定ブランチへのコミットを通知

```
/github subscribe swfz/til commits:master
```

### デフォルトで対象になっているイベントを解除

```
/github unsubscribe swfz/til issues,commits,releases,deployments
```

複数ある場合はカンマでつなげる

## RSS Feed

GitHubが用意しているRSSフィードでもある程度フィルタリングした情報を購読できる

- 特定ブランチの特定ファイルやディレクトリ（以下）の更新を取得するURL

```
https://github.com/${user}/${repo}/commits/${branch}/${path}.atom
```

- 例

`master`ブランチの`content/blog/entries`以下の更新のみ

```
https://github.com/swfz/til/commits/master/content/blog/entries.atom
```

このあたりを

```
/feed subscribe ${feedUrl}
```

で登録する

### 参考

[Githubが結構色々なatomフィードを出せるので、連携で役に立ったりする - Qiita](https://qiita.com/sawanoboly/items/eddc1e230657184d5121)

