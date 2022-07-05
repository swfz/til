---
title: "GitHub CLIコマンドでアカウントを切り替えたい"
date: "2022-07-05"
description: "oauth_tokenを切り替える"
tags:
  - GitHub
  - GitHub CLI
---

## version

```shell
$ gh --version
gh version 2.13.0 (2022-06-22)
https://github.com/cli/cli/releases/tag/v2.13.0
```

同一マシン上でGitHubのアカウントを切り替えて`gh`コマンドを使いたいというケースが発生した

普段使っているアカウントと別アカウントの認証情報を参照できれば問題ないはずということでちょっと調べてみた

GitHub CLIで`gh auth login`後にどんなファイルが生成されるか調べてみたが、見つけられたのは下記

```
.local/state/gh/state.yml
.config/gh/hosts.yml
```

この情報を持ってればOKそう

いったんDockerコンテナなど普段使いとは違う環境で`gh auth login`して別アカウントの`oauth_token`をメモ

環境変数`GITHUB_TOKEN`に`hosts.yml`の`oauth_token`の値を入れてコマンドをたたけばアカウント切り替えた状態でCLIを実行できる

他の方法もありそうだがやりたいことはこれで実現できた

参考:

[gh auth login | GitHub CLI](https://cli.github.com/manual/gh_auth_login)