---
title: "next-pwaの設定方法が5.6で変わった"
date: "2022-09-07"
description: "README読みましょう案件"
tags:
  - Next
  - React
---

Renovate対応してたらビルドエラーが発生してたので調べて対応した

`next-pwa`が5.5.5 -> 5.6.0の更新でコケていた

エラーとしては次のような文言

```
Failed to compile.

Please check your GenerateSW plugin configuration:
[WebpackGenerateSW] 'reactStrictMode' property is not expected to be here. Did you mean property 'exclude'? 
```

```
Failed to compile.

Please check your GenerateSW plugin configuration:
[WebpackGenerateSW] 'pwa' property is not expected to be here.
```

RenovateのPRからリリースの差分に飛んでみたらREADMEにも変更あるし使い方が変わったよう

[Renovate Bot Package Diff](https://app.renovatebot.com/package-diff?name=next-pwa&from=5.5.5&to=5.6.0)

ということでREADMEを見ながら設定を変えた

`runtimeCaching`はデフォルトで使用するらしいのと特に設定をカスタムしているわけではなかったので外した

```diff
 /** @type {import('next').NextConfig} */
-const withPWA = require('next-pwa');
-const runtimeCaching = require('next-pwa/cache');
+const withPWA = require('next-pwa')({
+  dest: 'public'
+})

 module.exports = withPWA({
-  reactStrictMode: true,
-  pwa: {
-    dest: 'public',
-    runtimeCaching,
-  },
+  reactStrictMode: true
 });
```

無事ビルドできるようになった

