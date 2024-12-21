---
title: "Error: React-Hot-Loader: AppContainer should be patched"
date: "2020-11-15"
description: "yarn whyでチェック"
tags:
  - Gatsby
  - Yarn
  - Node
---

次のリンクとまったく同じ状態になった

[Gatsby doesn't work with React 17 RC (Error: React-Hot-Loader: AppContainer should be patched) · Issue #26979 · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/issues/26979)

https://github.com/gatsbyjs/gatsby/issues/26979#issuecomment-696702777

のコメントにあるようにパッケージのバージョンを上げればOKのよう

`react-hot-loader`自体はgatsbyの依存モジュールで`package.json`には含まれていなかったため

気にせず`yarn add`したら解決するかと思ったら解決せず…

`yarn why`で確認すると2つのバージョンが混在する状態になっていた

```shell
$ yarn why react-hot-loader
yarn why v1.22.5
[1/4] Why do we have the module "react-hot-loader"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "react-hot-loader@4.13.0"
info Has been hoisted to "react-hot-loader"
info This module exists because it's specified in "devDependencies".
info Disk size without dependencies: "652KB"
info Disk size with unique dependencies: "1.96MB"
info Disk size with transitive dependencies: "2.8MB"
info Number of shared dependencies: 16
=> Found "gatsby#react-hot-loader@4.12.21"
info This module exists because "gatsby" depends on it.
info Disk size without dependencies: "288KB"
info Disk size with unique dependencies: "1.61MB"
info Disk size with transitive dependencies: "2.45MB"
info Number of shared dependencies: 16
Done in 1.94s.
```

新たにインストールしたほうは呼ばれていないっぽい

ということで次の記事を参考にして`yarn.lock`の`gatsby#react-hot-loader`の部分を削除して再度`yarn install`で解決した

[yarn upgrade で更新できない間接的な依存パッケージだけをアップグレードするには - Qiita](https://qiita.com/uasi/items/ca440a750a77ca62321b)

[https://qiita.com/uasi/items/ca440a750a77ca62321b:embed:cite]

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
直接`yarn.lock`触るのはちょっと気が引けたので別の機会で他の方法がないか調べてみようと思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->