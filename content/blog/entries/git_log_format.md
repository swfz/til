---
title: "GitのLogフォーマットを指定し、日付を表示する"
date: "2022-07-12"
description: "--pretty=format:"
tags:
  - Git
---

コミットの日付をみたい人生だった

```
git log --pretty=format:'%H [%ai] %an %s'
```

```
sha [日時] author コメント
```

```shell
dff11aca396f7b6550cdb7c7c490e9066ef79513 [2022-06-17 03:35:26 +0900] swfz memo
d365f46b1455ab1c6a7b00084784a7be72f04fa8 [2022-06-17 03:33:20 +0900] swfz hoge
b7de206695c37193be32042ffd6e4b5c96980dd2 [2022-06-17 03:29:24 +0900] swfz fuga
0672cbf90775a79d27c80bfbe27b1eff2f76d6d1 [2022-06-17 02:58:40 +0900] swfz sample
```

って感じ

参考:
[Git - pretty-formats Documentation](https://git-scm.com/docs/pretty-formats)