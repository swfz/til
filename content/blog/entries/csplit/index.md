---
title: 特定文字列でファイルを分割する
date: "2023-02-07"
description: "csplitを使う"
tags:
  - csplit
  - ShellScript
---

## 背景

もともとToDoリストをひとつのMarkdown+VS Codeで管理していた

そして最近ObsidianのDailyNoteでToDoを管理するように変更したので、どうせなら過去のToDoをObsidian管理下にうつしてしまおうとした

- work_todo.md

```markdown
## 2022-08-02
- [x] 依頼1
- [x] 依頼2

## 2022-08-03
- [x] タスクA
- [x] タスクB
```

## 分割

特定文字列でファイルを分割できないかと思って調べたらちょうどやりたいコマンドがあった

[テキストファイルを任意の文字列で分割するには － ＠IT](https://atmarkit.itmedia.co.jp/flinux/rensai/linuxtips/a072csplit.html)

```
csplit -z  work_todo.md "/^## 2022/" "{*}"
```

で`xx01`とか`xx02`...というようにファイルができた

分けたファイルを2022-11-23.mdといった形式にしたい

ファイル名を制御するようなオプションはなさそうだったのでやむなく下記のスクリプトで別名保存した

- rename.sh

```bash
#!/bin/bash

file=$1

md_filelname="$(head -n 1 ${file} | sed -e 's/## //').md"

cp ${file} /path/to/obsidian/daily_note/${md_filelname}
```

```bash
find . -name "xx*" | xargs -i sh rename.sh {}
```
