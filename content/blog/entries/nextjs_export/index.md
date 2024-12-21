---
title: "Next.jsで静的ファイルだけ使えるようにする"
date: "2022-09-11"
description: "SSG"
tags:
  - Next
---

Next.jsでbuildした後ホスティングサービスへ配信する際の成果物指定の方法

デフォルトの挙動として、`next build`ではSSRなどサーバ側も含めてビルドした成果物を`.next`に配置する

[Advanced Features: Static HTML Export | Next.js](https://nextjs.org/docs/advanced-features/static-html-export)

静的ファイルのみをホストしたい場合、デフォルトの`.next`を指定しても静的ファイルを配信できる状態ではないので配信できない

しらなかった…

## 静的ファイルだけでOKな場合（SSG）

`next export`で静的ファイルを`out`に置き、`out`ディレクトリをサーブすることでページを閲覧できるようになる

<!-- textlint-disable ja-technical-writing/sentence-length -->
なのでサーバサイドでの処理が不要な場合は公式の通り`next build && next export`で静的ファイルだけを`out`ディレクトリに置き、ホスティングサービスのGit連携で成果物があるディレクトリを指定する
<!-- textlint-enable ja-technical-writing/sentence-length -->

今までNext.jsで作成したサイトはVercelでしか配信したことなかったのでVercelがよしなにやってくれていたようだ

今回Cloudflare Pagesで配信する際にこれを知らずにつまずいた