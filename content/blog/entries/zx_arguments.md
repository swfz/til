---
title: "zx使用時のコマンドライン引数のリスト"
date: "2022-06-21"
description: "process.argv"
tags:
  - zx
  - JavaScript
---

```shell
zx query.mjs hoge
[
  '/home/user/.anyenv/envs/nodenv/versions/16.13.0/bin/node',
  '/home/user/.anyenv/envs/nodenv/versions/16.13.0/bin/zx',
  'query.mjs',
  'hoge'
]
```

普通のnodeスクリプトだと`process.argv.slice(2)`でコマンドライン引数のリストを取得するが、zxの場合には`process.argv.slice(3)`になる
