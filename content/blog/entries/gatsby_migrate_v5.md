---
title: "Gatsbyのバージョンを5に上げた"
date: "2023-04-26"
description: "マイグレーションガイドをしっかり読みましょう"
tags:
  - Gatsby
  - Node
---

本ブログがGatsbyv4を使用していたのでv5に上げた

合わせてNode18とも依存があるので18にもした（CloudflareにデプロイしているのでNode18対応を待ってた

しっかり読まずに雰囲気で始めてしまったので時間かけてしまったが、基本的にMigrationガイド見ながら進めれば問題なさそう

[Migrating from v4 to v5 | Gatsby](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/)

以下やったこと

## 依存モジュールの更新

node_modules削除、yarn.lock削除で再インストール

renovateだけだと各モジュール依存モジュールのバージョンまでは更新してくれないのでいろいろ不整合が発生した

ひとつずつ潰していく前にとりあえず試してみるで良い気がする

```shell
$ rm yarn.lock
$ rm -rf node_modules
$ yarn
```

結構lockファイルに差が出た

## GraphQLのクエリ更新

groupとsortのフィールド指定の方法が変わったよう

マイグレーションガイドみたら下記実行しろとのこと

```
npx gatsby-codemods@latest sort-and-aggr-graphql .
```

codemodsがBRAKING CHANGESの修正をしてくれる

便利…

結構時間かけてしまったけど完全にドキュメント読め案件


## 型エラーの解消

これは自分のコードの問題だが一応合わせて対応したので残しておく

```
$ tsc --noEmit
gatsby-browser.tsx:28:11 - error TS2559: Type '{ children: ReactNode; }' has no properties in common with type 'IntrinsicAttributes'.

28   return <Layout {...props}>{element}</Layout>
             ~~~~~~

src/components/layout.tsx:9:29 - error TS2339: Property 'children' does not exist on type '{}'.

9 const Layout: React.FC = ({ children }) => {
```

[React: Type {children: Element} has no properties in common with type IntrinsicAttributes | bobbyhadz](https://bobbyhadz.com/blog/react-type-children-has-no-properties-in-common)

ここを参考にした

ようはpropsを受け取らないコンポーネントに`props`渡すなって話らしい

しかしながら`children`は必要なのでLayout側ではReactNodeの型定義を用意した

他にもwarningはいくつか残っているがGatsby5で動作させられるところまで持っていけた

## 該当PR

[feature/gatsby v5 and node18 by swfz · Pull Request #1408 · swfz/til](https://github.com/swfz/til/pull/1408)