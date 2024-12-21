---
title: "GitHub CLIコマンドでscopeを設定する"
date: "2022-07-04"
description: "--scopes"
tags:
  - GitHub CLI
  - GitHub
---

[gh auth login | GitHub CLI](https://cli.github.com/manual/gh_auth_login)

ghコマンドの権限周りで何か怒られた場合はこの操作で権限を追加する

変更するためには再度ログインが必要

- プロジェクトへのread権限、codespaceへのread/write権限を追加する図

```
gh auth login --scopes 'read:project,codespace'
```

GraphQLでいうProjectV2（GitHub Issues beta）へのアクセスには`project`への権限が必要

GitHub CLI自体はOAuthで認証しているのでスコープの指定方法は次のドキュメントを参照すればよさそう

[OAuth Appのスコープ - GitHub Docs](https://docs.github.com/ja/developers/apps/building-oauth-apps/scopes-for-oauth-apps)