---
title: "dayjsをTypeScriptで使う"
date: "2022-02-12"
description: "tsconfigによって読み込み方法が違う。公式ちゃんと読みましょう"
tags:
  - TypeScript
  - dayjs
---

コンパイルエラーで動かん!と何度か調べてたがドキュメントちゃんと読め案件だった

### ドキュメント

[Typescript · Day.js](https://day.js.org/docs/en/installation/typescript)

なんとなく最初の方だけ読んでコピーして動かしてみたらコンパイルエラーで「なんで!!!」と言ってたがよく読んだらtsconfigの中身によって読み込み方法を変えてねと書いてあった

`esModuleInterop`がtrueになっている場合は`import dayjs from "dayjs"`

falseの場合は`import * as "dayjs"`

dayjsに関してはとりあえず毎度調べて困ることはなくなった

この辺のES ModulesとCommonJSがーっていうのとオプションの有無によるモジュール読み込み方法が変わることに対する理解は正直あまり深まっていない

いくつか記事読んでみたが説明できるほど理解できなかったのでまた別の機会で…
