---
title: "pnpmでyarn.lockからimportしてロックファイルを生成する"
date: "2023-10-13"
description: "pnpm import"
tags:
  - pnpm
  - yarn
---

最近yarnをv1のまま使っていていろいろ不具合を踏むことが多くなってきたので移行先としてpnpmを使い始めている

ローカルでpnpmをとりあえず入れてみたものの、依存関係が変わり今まで通り動かなくなってしまい時間を溶かしていた

`pnpm import`を知ってればサクッと行く話だったのでメモ

## import

特定のロックファイルからpnpm-lock.yamlを生成するコマンドが用意されている

[pnpm import | pnpm](https://pnpm.io/cli/import)


```shell
pnpm import yarn.lock
pnpm i --frozen-lockfile
```

これで既存のyarn.lockと内容変えずにインストールできるはず

## 個別にインストール

今回の個別の話

次のリポジトリでpnpmを使うようにした

[swfz/article-search](https://github.com/swfz/article-search)

yarnの場合フラットなnode_modulesになっていて明示的にpackage.jsonになかったとしても、どこかのモジュールの依存の中に存在するモジュールを呼び出すことができた

pnpmにしたことによって今までのような使い方ができなくなるので使いたい場合は明示的にpackage.jsonに追加してあげる必要がある

下記は依存の中のライブラリだがコード中で呼び出していたためインストールし直す必要があった（ビルド時に「ないよ！」と怒られる）

```
"instantsearch.js": "4.58.0"
"@testing-library/dom": "9.3.3" // dev
```

インストールし直すときにyarn.lockの中からバージョンを探してバージョンを固定してインストールした

```shell
$ yarn why instantsearch.js
$ yarn why @testing-library/dom
```

```shell
$ pnpm i instantsearch.js@4.58.0
$ pnpm i -D @testing-library/dom@9.3.3
```

algolia系のモジュールは結構破壊的変更が入っているイメージがある

だいたいバージョン上げるとうまく動かない

今回何も考えず移行したらテストが通らずいろいろ試してたが、結局この辺のバージョンがうまく噛み合っていなかったのが原因のよう

<!-- textlint-disable prh -->
最初から一通りドキュメントを読んでおけばそんなに時間を溶かすことなかったのに案件
<!-- textlint-enable prh -->