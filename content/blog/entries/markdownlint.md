---
title: "markdownlintを使ってみた"
date: "2022-07-26"
description: "markdownlint"
tags:
  - markdownlint
---

[DavidAnson/markdownlint: A Node.js style checker and lint tool for Markdown/CommonMark files.](https://github.com/DavidAnson/markdownlint)

Markdownのlinter

- インデントは○で!
- Headingの後は改行入れて!
- 1行の文字数どのくらいまで

などいろいろ指摘してくれる

<!-- textlint-disable prh -->
CLIも用意されているのでCI用途でも使えるし、エディタの拡張をつかってエディタ上にほかのlinterと同様警告を表示できる
<!-- textlint-enable prh -->

プライベートの記事執筆環境で、デフォルトの2だと警告が出ているためリストのインデントを4に設定した

VS Codeだとショートカット`F8`, `Shift+F8`で警告箇所へジャンプできるが

textlintの警告（本来ジャンプして直したい箇所）と合わせてジャンプ対象になってしてしまう

- .markdownlint.yml

```yaml
MD007:
  indent: 4
```

地味に邪魔だったので今の自分の環境に合わせて警告が出ないようにした
