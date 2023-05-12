---
title: "gatsby-plugin-algoliaのメジャーバージョンアップに伴う色々"
date: "2023-05-12"
description: "BREAKING CHANGESへの対応例"
tags:
  - Gatsby
  - Algolia
---

本ブログで使っているplugin、普通にバージョンを上げただけだとビルドが通らなかったので調べていろいろ対応した

## 対象

```
gatsby-plugin-algolia 0.26.0 -> 1.0.3
```

## 主な変更点

[chore(release): 1.0.0 · algolia/gatsby-plugin-algolia@c04512c](https://github.com/algolia/gatsby-plugin-algolia/commit/c04512cd67cb6a8effd5c1fa80609db1f8dfb22b)

BREAKING CHANGESで書いてあった

```
* indexing:**enablePartialUpdatesをtrueにし、オプションを削除しました。  
* **indexing:** matchFields については contentDigest にのみ依存し、オプションを削除しました。  
* インデックス作成：** skipIndexingフラグを削除し、dryRunまたはcontinueOnFailureのいずれかを使用します。
```

毎度ビルド時に実行したとしてもプラグイン側でしっかり差分だけ見つけてIndexingしますよっていう感じみたい

CD側で気を利かせてこの場合はAlgoliaのデータ更新で、みたいなことをしなくてもよくなるのかな

今まではデプロイ時、Algoliaに毎度更新掛けるとAPIオペレーション数が結構消費するということで

`master`ブランチかつ記事コンテンツに変更があるときのみpluginが動くようにし、それ以外のときは`skipIndexing`で処理させないようにしていた

毎度全件更新掛けるような設定にしていたのでpartialUpdatesによってAPIオペレーション数も節約できるはず

良さそう!

## APIへのアクセス

しかし問題が1つあった

メジャーバージョンアップに伴い`skipIndexing`オプションがなくなり`dryRun`だと次のような処理でAPIへのアクセスが発生してしまうようになった

- 既存のIndexがあるかのチェック
- 既存のドキュメントと差分が発生しているかチェック
    - contentDigestをチェックしている
    - 記事の中身に変更があった場合はこのcontentDigestが変化し、差分が発生したと判断するよう

なので記事の更新がないパターンで`dryRun`を使ったとしてもAPIアクセスが必要になってしまった

執筆時の自分の状況だと記事に変更がない場合でも下記のオペレーションが消費された

- index operation: 3
- search operation: 3

記事に変更があると上記プラスアルファで変更分の`record operation`が発生する

自分の環境だとGitHub ActionsでCIを回していてそのときはAlgoliaへの登録処理はする必要がないのでそもそもAlgoliaのAdmin APIキーのSecretを登録していない

デプロイはCloudflare Pagesで行っているのでAlgoliaのAdmin APIキーをCloudflareには登録している

バージョンアップでCIでもAPIアクセスが発生するためエラーとなってしまう

`continueOnFailure`で良いのでは？

とも考えたが常に失敗を無視すると、本来気付くべきエラーが発生した際に気付けない可能性がある

それは嫌だなということで採用しなかった

だからといってAPIキーを登録するのもPRのたびにAPIたたかれたらオペレーション数をそれなりに消費するし、そのためだけにGitHubにシークレット登録したくないということでどうしようと悩んだ

悩んだ結果、だいたいプラグイン中でやっていることはわかったので`patch-package`でパッチを当てて`skipIndex`の処理をいれてしまうことにした

## gatsby-pluginの作法

コード読んだ

`gatsby-node.js`のライフサイクルフックを書けばOKのよう

algoliaのpluginは`onPostBuild`でいろいろ処理をやっている

で、`gatsby-config`の内容を各pluginのライフサイクルの引数`config`で読めるみたい

どうしてそうなっているかまでは追えてない（gatsbyのソース読まないといけなそうなので読んでない）

ということで0.26であった`skipIndexing`オプションを復活させた

- 対象のPullRequest

[Renovate/patched gatsby plugin algolia 1.x by swfz · Pull Request #1425 · swfz/til](https://github.com/swfz/til/pull/1425)

## 最後に

記事書きながら思ったこととしては結局CI/CD側でも記事に更新や新規があるかはチェックするのでその値を`dryRun`+`ontinueOnFailure`両方に設定すればよいかも? と思った

次のバージョンアップの機会に検討する

