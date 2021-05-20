---
title: "sedで特定箇所の数値を抜き出す"
date: "2021-05-20"
description: "\\dはperlでした"
tags:
  - sed
---

sedでURLの数値部分だけを抜き出したい

みたいなことをやっていて

```
$ echo -n "https://api.github.com/repos/swfz/github-actions-playground/actions/runs/855305996/cancel" | sed -e 's/runs\/\(\d+\)\/cancel/\1/g'
```

これで`run_id`（855305996）を抜き出せるかとやってみてたが何も反応がない

それで調べてみたところstackoverflowが引っかかった

sedはPerlではない!ということで数値の正規表現として`\d`は使えない

数値をマッチさせたい場合は`[[:digit:]]` か `[0-9]`と表現するよう

知らなかった…

ということで、sedを用いてrun_idの部分を抜き出したい場合は次のようにする

```
$ echo -n "https://api.github.com/repos/swfz/github-actions-playground/actions/runs/855305996/cancel" | sed -e 's/https.*runs\/\([0-9]*\)\/cancel/\1/g'
855305996
```

参考：[regex - How to match digits followed by a dot using sed? - Super User](https://superuser.com/questions/513412/how-to-match-digits-followed-by-a-dot-using-sed)