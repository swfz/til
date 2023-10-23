---
title: "react-instantsearch-hooks-webが新たに書き換えられたらしい"
date: "2023-10-18"
description: "react-instantsearch"
tags:
  - Algolia
  - React
---

AlgoliaのReactクライアントを使っているプロジェクトで、開発サーバ立ち上げたら下記のようなログが…

```
[InstantSearch] The package `react-instantsearch-hooks` is replaced by `react-instantsearch-core`. The API is the same, but the package name has changed. Please update your dependencies and follow the migration guide: https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/react/
```

見に行ったらマイグレーションガイドが出てた

[Upgrading React InstantSearch | Algolia](https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/react/)

書き直したらしい…

`react-instantsearch-hooks-web`は`react-instantsearch`になります、とのこと

codemodsがあるからということで試してみたが差し替えてくれなかった…

```
$ npx @codeshift/cli --packages 'instantsearch-codemods#ris-v6-to-v7' pages
Need to install the following packages:
@codeshift/cli@0.19.3
Ok to proceed? (y) y
⚠ Unable to locate Hypermod package: @hypermod/mod-instantsearch-codemods
ℹ Attempting to download npm package: instantsearch-codemods
✔ Found remote Hypermod package: instantsearch-codemods
Running transform: /home/user/.npm/_npx/f341b6febc846893/node_modules/@hypermod/cli/node_modules/instantsearch-codemods#ris-v6-to-v7
No files selected, nothing to do.
All done.
Results:
0 errors
0 unmodified
0 skipped
0 ok
Time elapsed: 0.008seconds
```

codemodsは平たく言うとマイグレーションガイドの操作やある程度規則に沿った変更を自動でやってくれるくん

ASTからASTに変換する、特定の条件に合うコードはこう変換するというルールをコード定義することで単純作業を自動化する

Angularは結構前からマイグレーション時にこういうことやってくれてたので多分これ使っているのかな

npmから`instantsearch-codemods`で調べたらほかにも情報が出てきた

[instantsearch-codemods - npm](https://www.npmjs.com/package/instantsearch-codemods)

そこにドキュメント以外のものも載ってたので試してみる

```
$ npx @codeshift/cli --packages 'instantsearch-codemods#rish-to-ris' pages
Need to install the following packages:
@codeshift/cli@0.19.3
Ok to proceed? (y) y
⚠ Unable to locate Hypermod package: @hypermod/mod-instantsearch-codemods
ℹ Attempting to download npm package: instantsearch-codemods
✔ Found remote Hypermod package: instantsearch-codemods
Running transform: /home/user/.npm/_npx/f341b6febc846893/node_modules/@hypermod/cli/node_modules/instantsearch-codemods#rish-to-ris
No files selected, nothing to do.
All done.
Results:
0 errors
0 unmodified
0 skipped
0 ok
Time elapsed: 0.009seconds
```

これでも変わらず

`Running transform` でコードの場所が出力されるので見に行って中身読んだら、コード量は少ないしやっていることも分かるには分かる

ASTさえ把握してしまえば追うことはできそう

幸いペライチのプロジェクトなので一ヵ所しか変更なかったので、手動で対応して終わらせたw

で開発サーバが起動した

```
Starting from the next major version, InstantSearch will change how widgets state is preserved when they are removed. InstantSearch will keep the state of unmounted widgets to be usable by other widgets with the same attribute.

We recommend setting `future.preserveSharedStateOnUnmount` to true to adopt this change today.
To stay with the current behaviour and remove this warning, set the option to false.

See documentation: https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/#widget-param-future
```

なんかまたいわれている…

挙動変更があるよって言っているっぽい

majorバージョンでって言っているのでそのとき対応しよう…

### 対応PR

- [migrate react-instantsearch-hooks-web to react-instantsearch by swfz · Pull Request #199 · swfz/article-search](https://github.com/swfz/article-search/pull/199)

