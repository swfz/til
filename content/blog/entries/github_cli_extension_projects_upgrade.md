---
title: "GitHub CLI拡張upgrade時のエラー対応"
date: "2023-03-03"
description: "GLIBC"
tags:
  - GitHub CLI
  - GitHub Projects
---

動作環境

```
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.5 LTS
Release:        20.04
Codename:       focal
```

GitHubのprojectsのCLI拡張がいろいろできるよという記事を見て使ってみるかと思い（すでに以前インストールしてた）更新したら

```
$ gh extension upgrade github/gh-projects
[projects]: upgraded from v0.7.0 to v0.8.1
✓ Successfully upgraded extension
```

エラーが出てきた

```
$ gh projects
/home/user/.local/share/gh/extensions/gh-projects/gh-projects: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.32' not found (required by /home/user/.local/share/gh/extensions/gh-projects/gh-projects)
/home/user/.local/share/gh/extensions/gh-projects/gh-projects: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.34' not found (required by /home/user/.local/share/gh/extensions/gh-projects/gh-projects)
```

GitHub CLI拡張のうちGo言語で作られているものはインストール時にビルドされるという話だったはずなので

下記参考サイトにしたがって環境変数をセットしてインストールし直した

- 参考
[`go build` した Go のバイナリを実行すると「/lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.32' not found`」を出力して止まるときにやったこと。 - 全力で怠けたい](https://ebc-2in2crc.hatenablog.jp/entry/2020/10/14/030150)


```
$ CGO_ENABLED=0 gh extension  install github/gh-projects
✓ Installed extension github/gh-projects
```

```
$ gh projects
Work with GitHub Projects. Note that the token you are using must have 'project' scope, which is not set by default. You can verify your token scope by running 'gh auth status' and add the project scope by running 'gh auth refresh -s project'.

Usage:
  projects [command]

Available Commands:
  close        Close a project
  completion   Generate the autocompletion script for the specified shell
  copy         Copy a project
  create       Create a project
  delete       Delete a project
  edit         Edit a project
  field-create Create a field in a project
  field-delete Delete a field in a project by ID
  field-list   List the fields in a project
  help         Help about any command
  item-add     Add a pull request or an issue to a project
  item-archive Archive an item in a project
  item-create  Create a draft issue item in a project
  item-delete  Delete an item from a project by ID
  item-edit    Edit a draft issue in a project by ID
  item-list    List the items in a project
  list         List the projects for an owner
  view         View a project

Flags:
  -h, --help   help for projects

Use "projects [command] --help" for more information about a command.
```

使えるようになった
