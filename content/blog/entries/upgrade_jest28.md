---
title: "Jest28への更新に必要だった作業"
date: "2022-05-05"
description: "いくつか躓いたのでメモ"
tags:
  - Jest
---

本ブログで使っているJestがRenovateにより自動でバージョンアップしていたが28系にあげる際、いつくか詰まったのでメモ

## jest-environment-jsdomの分割

- エラー内容

```
$ jest --config ./jest.config.js
● Validation Error:

  Test environment jest-environment-jsdom cannot be found. Make sure the testEnvironment configuration option points to an existing node module.

  Configuration Documentation:
  https://jestjs.io/docs/configuration


As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.
```

最後の文が言っているとおり、Jest28以降は`jsdom`を使いたい場合別途インストールしてねということらしい


```
yarn add -D jest-environment-jsdom
```

でOK

## trailing-slash-optionのWorkaroundな設定を削除

- エラー内容

```
 FAIL  src/components/__tests__/line.tsx
  ● Test suite failed to run

    ENOENT: no such file or directory, open '/workspaces/til/node_modules/gatsby-page-utils/dist/dist/apply-trailing-slash-option.js'

      at Runtime.readFile (node_modules/jest-runtime/build/index.js:2552:21)
      at Object.<anonymous> (node_modules/gatsby-link/rewrite-link-path.js:8:33)
```

下記のworkaroundを使っていたがそれが解決されたっぽい

[Cannot find module 'gatsby-page-utils/apply-trailing-slash-option' since Gatsby 4.7 · Issue #34784 · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/issues/34784#issuecomment-1034695025)

大本のIssueは次のIssue

[Support package exports in `jest-resolve` · Issue #9771 · facebook/jest](https://github.com/facebook/jest/issues/9771)

gatsbyの`trailing-slash-option`を使用したときにモジュール読み込みのパス指定がうまくいかずに設定でなんとかしていたところの部分を削除した

- jest.config.js

```diff
moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
-   "^gatsby-page-utils/(.*)$": `gatsby-page-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
}
```
