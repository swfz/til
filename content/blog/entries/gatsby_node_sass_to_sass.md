---
title: "gatsbyでnode-sassの依存と戦ってたら不要になっていた"
date: "2022-01-04"
description: "dart-sass"
tags:
  - Gatsby
---

本ブログ（gatsby）でnode-sassをなんとなく使っていたがrenovateで毎度対応が必要になっていてどうしたものかなーと思っていた

```
Module Error (from ./node_modules/sass-loader/dist/cjs.js):
Node Sass version 7.0.1 is incompatible with ^4.0.0 || ^5.0.0 || ^6.0.0.
error Command failed with exit code 1.
```

<!-- textlint-disable prh -->
毎度のごとく調べていたら次のような記事を見つけた
<!-- textlint-enable prh -->

[さらば Error: Node Sass version X.X.X is incompatible with ^X.X.X. - Qiita](https://qiita.com/slangsoft/items/acd66675e5e46febfa8d)

なるほど!node-sassは非推奨!

gatsbyのプラグイン側ではどうしているのかということでドキュメントを見に行った

[gatsby-plugin-sass | Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/)

Gatsbyの公式でも次のように言及している

> By default, the Dart implementation of Sass (sass) is used. To use the implementation written in Node (node-sass), you can install node-sass instead of sass and pass it into the options as the implementation:

デフォルトではsass（dart-sass）を使用するらしい

gatsbyのv2から使っていたので少なくともそのときはnode-sassが非推奨ではなかったのかな？

そこまで追えてないがあえてnode-sassを入れる必要はないようだ

このあたりを見てみたが、自分のプロジェクトはsassではなくnode-sassを入れていた

そしてsassは依存に入っていなかった

ドキュメントでは`node-sass`を使用するときは明示的に指定するようにって感じのことを書いてあった

しかし、`gatsby-config.js`でオプションを何も指定していなかったとしても気を利かして`node-sass`を読んでくれていたよう


## node-sass -> sass

```shell
yarn remove node-sass
yarn add sass
```

で解決