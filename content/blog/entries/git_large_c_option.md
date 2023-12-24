---
title: "Gitの-Cオプション"
date: "2023-12-20"
description: ""
tags:
  - Git
---

nodenvで特定のバージョンをインストールする際に指定バージョンがない場合にエラーが出る

普段は読み飛ばしてたがよく見るとこのコマンドで更新してねと書いてあった

```shell
node-build: definition not found: 18.18.0

See all available versions with `nodenv install --list'.

If the version you need is missing, try upgrading node-build:

  git -C /home/user/.anyenv/envs/nodenv/plugins/node-build pull
```

これで更新できるのかと思ったが

`git -C`

ん？

man見たら

```
       -C <path>
           Run as if git was started in <path> instead of the current working directory. When multiple -C options are given, each subsequent non-absolute -C <path> is interpreted relative
           to the preceding -C <path>. If <path> is present but empty, e.g.  -C "", then the current working directory is left unchanged.

           This option affects options that expect path name like --git-dir and --work-tree in that their interpretations of the path names would be made relative to the working directory
           caused by the -C option. For example the following invocations are equivalent:

               git --git-dir=a.git --work-tree=b -C c status
               git --git-dir=c/a.git --work-tree=c/b status
```

```
git が現在の作業ディレクトリではなく <path> で起動されたかのように実行します
```

知らなかったー!!!

これは楽

CI/CDとかのスクリプト内でも使えそう