---
title: "GatsbyにAlgoliaを導入する"
date: "2021-06-15"
description: "gatsby-plugin-algolia入れるだけ"
tags:
  - Algolia
  - Gatsby
---

一応ログとして残すがやったのは下記プラグインを入れただけ

[gatsby-plugin-algolia | Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-algolia/)


## インデックスの更新

記事の内容をAlgoliaのインデックスに登録するための設定

インデックスの登録はbuild時に行われる

こちらはAlgoliaの管理画面からAdminのAPI Keyが必要

graphqlのクエリに関しては自分の設定に合わせる必要があるので`/__graphql`でよしなにできるようにクエリを確かめる

とりあえずデータが登録できるところまでを確認

## UIの実装

[React InstantSearch Widgets | React InstantSearch | API Reference | Algolia Documentation](https://www.algolia.com/doc/api-reference/widgets/react/)

Gatsbyのブログ見てとりあえずコピー&ペーストしてIndexNameだけ変更すれば動くものは作れた

あとは細かく必要そうなものを足したり調整したりするくらいでOKそう

## 参考と若干変えた部分

### デプロイ時のみインデックス情報を設定するようにした

- gatsby-config.js

```javascript
        skipIndexing: process.env.BRANCH !== 'master', // default: false, useful for e.g. preview deploys or local development
```

デプロイ時のみAlgoliaにデータ更新すればよいのでこうした

### AlgoliaへのSearchクエリ部分

edgesの内容に次の2項目を足した

```
rawMarkdownBody
timeToRead
```

これでMarkdownBodyも検索対象に含まれるのかな?そこまで確認してないがいったん突っ込めるので突っ込んだ

### .envについて

`dotenv`を入れているがこれを使っているのは開発時のみで`.env.development`を用意して環境変数を読み込ませている

デプロイ時はすでに環境変数に各種キーを入れているので`.env`を使用していない

## まとめ

取り急ぎ検索は可能になった

が若干もっさり感が残っていて、とりあえず使えるようになりました!って感じなのでそのあたりチューニングしたい

あと検索対象や検索結果の見た目もカスタマイズしたいところ

どっかで時間作ってやる…

あとgraphqlのエディタが項目チェックするだけでクエリ作ってくれる感じになっていてとても使いやすかった

### 全体の参考
- [Adding Search with Algolia | Gatsby](https://www.gatsbyjs.com/docs/adding-search-with-algolia/)
- [gatsby-plugin-algolia | Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-algolia/)
- [Gatsby+microCMSサイトにAlgolia全文検索機能を実装 - Qiita](https://qiita.com/atomyah/items/b772a63fc70bf8e7dbdd)