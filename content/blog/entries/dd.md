---
title: 特定の容量のダミーファイルを生成する
date: "2020-10-23"
description: "dd"
tags:
  - Command
---

```shell
$ dd if=/dev/zero of=1K_M.out bs=1K count=1
1+0 records in
1+0 records out
1024 bytes (1.0 kB) copied, 0.000412943 s, 2.5 MB/s
```

```
$ ls -al 1K_M.out
-rw-rw-r-- 1 vagrant vagrant 1024 Oct 24 04:46 1K_M.out
```

ディスク的には4KBで固定のよう

```
$ du -sh 1K_M.out
4.0K    1K_M.out
```

`1K_M.out`というファイル名にnull文字で埋める、1KBで1ファイル作成する

容量によって確認したいことが変わる場合など容量を合わせていくの意外と面倒だったりするのでそういうときに使える
