---
title: textlint-filterで使う除外パターン
date: "2020-06-18"
description: "はてな記法とか"
tags:
  - textlint
---

記事を書いていて良く引っかかるが今のところ自分のスタイルに合っていないので除外している設定を抜粋して残しておく

使っているプラグインは下記

[textlint/textlint-filter-rule-node-types](https://github.com/textlint/textlint-filter-rule-node-types)

[textlint/textlint-filter-rule-whitelist](https://github.com/textlint/textlint-filter-rule-whitelist)


- .textlintrc.yml

```yaml
filters:
  node-types:
    nodeTypes:
      - Link
      - Image
  whitelist:
    allow:
      # はてな記法のイメージ
      - /\[(.+?):embed:cite\]/
      # ファイル名のリストは除外
      - /.*\.[js|ts|yml|rb|rake|json|html]/
      - /\/etc\/.*/
```

## node-types

リンク記法と画像の記法の中身は引用などで記事タイトルだったりする場合もあるので除外

## whitelist

whitelistで正規表現を用いてはてな記法での画像も除外

よく

`- hoge.html`

のようにリスト形式でファイル名を表したりする

ここで技術用語などで引っかかると困るのでこのあたりも特定できる範囲で拡張子を追加して除外

