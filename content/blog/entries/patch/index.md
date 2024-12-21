---
title: "diffから後で適用するためのPatchを作成し充てる"
date: "2023-10-03"
description: "patch"
tags:
  - Command
---

## 差分からpatchファイルを作成

```shell
$ git diff --no-prefix path/to/filename > diff.patch
```

## 適用

```shell
$ patch -p1 < diff.patch
...
...
File to patch: path/to/filename
```

あまり良くないがローカルでは変更したいみたいなことがたまにあるのでメモ