---
title: "jqで一般的なJSONフォーマットをCSVへ変換するエイリアス"
date: "2024-07-18"
description: "alias"
tags:
  - jq
  - CSV
  - ShellScript
---

手元でさっとデータ出しや調査をしたい場合、とりあえずスプレッドシートに落としていろいろ見てみることが多く、その場合CSVをアップロードすることになる

手元でスクリプト書いたりする場合はなんだかんだでJSONに出力することが多いのでJSONからCSVへの変換をよく実施する

## サンプル

- sample.json

```json
[
    {"name": "Alice", "age": 30, "city": "New York"},
    {"name": "Bob", "age": 25, "city": "Los Angeles"},
    {"name": "Charlie", "age": 35, "city": "Chicago"}
]
```

## jqコマンド

こんな感じ

```bash
$ cat sample.json | jq -r '(.[0]|to_entries|map(.key)),(.[]|[.[]])|@csv'
"name","age","city"
"Alice",30,"New York"
"Bob",25,"Los Angeles"
"Charlie",35,"Chicago"
```

### ヘッダ部分

JSONのキー部分の値を取得する

```bash
$ cat sample.json| jq -r '(.[0]|to_entries|map(.key))'
[
  "name",
  "age",
  "city"
]
```

順を追ってみる

```bash
$ cat sample.json| jq -r '.[0]'
{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}
$ cat sample.json| jq -r '.[0]|to_entries'
[
  {
    "key": "name",
    "value": "Alice"
  },
  {
    "key": "age",
    "value": 30
  },
  {
    "key": "city",
    "value": "New York"
  }
]
$ cat sample.json| jq -r '.[0]|to_entries|map(.key)'
[
  "name",
  "age",
  "city"
]
```

### 2行目以降のデータ部分

各JSONオブジェクトの値を抽出

```bash
cat sample.json| jq -r '(.[]|[.[]])'
[
  "Alice",
  30,
  "New York"
]
[
  "Bob",
  25,
  "Los Angeles"
]
[
  "Charlie",
  35,
  "Chicago"
]
```

行ごとにしてから各行の値をリストにしている

## aliasに

```bash
alias jtoc="jq -r '(.[0]|to_entries|map(.key)),(.[]|[.[]])|@csv'"
```

### 結果

```bash
$ cat sample.json | jtoc
"name","age","city"
"Alice",30,"New York"
"Bob",25,"Los Angeles"
"Charlie",35,"Chicago"
```

よく使うかなということでアイリエスに追加しておいた

手元でさっとJSONデータをCSVに変換できる

<!-- textlint-disable prh -->
たとえば、スプレッドシートにデータをインポートしたり、CSV形式で保存して、他のツールと連携したりする場合に非常に便利
<!-- textlint-enable prh -->