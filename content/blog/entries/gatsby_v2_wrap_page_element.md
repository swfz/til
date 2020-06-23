---
title: Gatsby v2でwrapPageElementを使う
date: "2020-06-23"
description: "import x named export or require x module.export"
tags:
  - Gatsby
  - JavaScript
---

`Layout`的なコンポーネントを一ヵ所で設定したくて調べてみると

[Gatsby Browser APIs | GatsbyJS](https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement)

ここで`wrapPageElement`を定義すればよしなにやってくれるようなのでそれっとコピって実行したらエラーが出た

```
success open and validate gatsby-configs - 0.196s

 ERROR

This plugin file is using both CommonJS and ES6 module systems together which we don't support.
You'll need to edit the file to use just one or the other.

plugin: /mnt/c/Users/hoge/from-wsl/til/gatsby-browser.js

This didn't cause a problem in Gatsby v1 so you might want to review the migration doc for this:
https://gatsby.dev/no-mixed-modules
```

書いてあるとおり`require`使う場合は`module.exports`

`import`使う場合は`export default`を使えということらしい

[Migrating from v1 to v2 | GatsbyJS](https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6)

ということで次のように変えてエラー回避した

- gatsby-browser.js

```javascript

import React from "react"
import Layout from "./src/components/layout"

const wrapElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export { wrapElement as wrapPageElement }
```

対応ページそのまま`export default`でexportしてしまうと呼び出し側で`wrapPageElement`を区別できないので読み込まれない

named exportで`wrapPageElement`と名前を付けてexportしてあげる

エラーでも公式へのリンクで対応方法が示されていることが多く進めやすい

Gatsby今の所やりやすい
