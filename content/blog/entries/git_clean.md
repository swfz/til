---
title: "Gitでステージされていないファイルを削除する"
date: "2023-08-23"
description: "git clean"
tags:
  - Git
---

知らなかったー、都度調べて使ってた気もするけどぱっと出てこなかった

## ファイル

```
git clean -f
```

## ファイルとディレクトリ

```
git clean -fd
```

## dry run

```
git clean -n
```

## 試してみる

```
$ git status
## master...origin/master
?? .hoge/
?? fuga.txt
?? hoge.txt
```

```
$ git clean -n
Would remove fuga.txt
Would remove hoge.txt
```

削除される対象がリストアップされる


```
$ git clean -nd
Would remove .hoge/
Would remove fuga.txt
Would remove hoge.txt
```

ディレクトリもリストアップ対象に含まれる

```
$ git clean -d
fatal: clean.requireForce defaults to true and neither -i, -n, nor -f given; refusing to clean
```

<!-- textlint-disable prh -->
`-d`以外のオプションと組み合わせてね、具体的には`-i`:(対話的に削除), `-n`:(Dry Run), `-f`:(ファイル)と組み合わせてね
<!-- textlint-enable prh -->


```
$ git clean -df
Removing .hoge/
Removing fuga.txt
Removing hoge.txt
```

ディレクトリも削除される

## 対話的に削除する

```
$ git clean -id
Would remove the following items:
  .hoge/    fuga.txt  hoge.txt
*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit                 6: help
What now> c
Removing .hoge/
Removing fuga.txt
Removing hoge.txt
```

`-i`オプションで対話的にどのファイルを削除するか選択する

実際の画面だと、`clean`の`c`部分に色がついていて文言の頭文字を入力してねと言うようなUIになっている

いろいろ選択肢がある

### 正規表現でフィルタ

```shell
$ git clean -i
Would remove the following items:
  fuga.txt  hoge.txt
*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit                 6: help
What now> f
  fuga.txt  hoge.txt
Input ignore patterns>> hoge.*
  fuga.txt
Input ignore patterns>>
Would remove the following item:
  fuga.txt
*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit                 6: help
What now> c
Removing fuga.txt
```

- `f`入力
- 削除するファイルのパターン入力
- 対象の決定（エンター）
- `c`で削除

### 番号指定

```shell
$ git clean -i
Would remove the following items:
  fuga.txt  hoge.txt
*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit                 6: help
What now> s
    1: fuga.txt    2: hoge.txt
Select items to delete>> 2
    1: fuga.txt  * 2: hoge.txt
Select items to delete>>
Would remove the following item:
  hoge.txt
*** Commands ***
    1: clean                2: filter by pattern    3: select by numbers    4: ask each             5: quit                 6: help
What now> c
Removing hoge.txt
```

- `s`入力
- 削除するファイルに振られた番号を入力
- 対象の決定（エンター）
- `c`で削除