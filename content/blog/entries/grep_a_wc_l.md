---
title: "grepでマッチした行以降の値を表示する"
date: "2021-05-30"
description: "-A + wc -l"
tags:
  - grep
---

マッチした行以降の表示行数を指定するのは`-A`で行えるが対象のファイルの行数すべてをカバーしたい

- sample.txt

```
hoge
fuga
pyo

separator
itemA
itemB
itemC
itemD
itemE
```

`-A`の値を動的にすればカバーできるということで

```shell
cat sample.txt | grep -A $(wc -l sample.txt | awk '{print $1}') 'separator'
```

こんな感じで対象ファイルの行数を最大とするようにすれば取りこぼしがなくなる

