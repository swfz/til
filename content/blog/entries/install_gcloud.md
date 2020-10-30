---
title: gcloudコマンドのインストール
date: "2020-10-30"
description: "インストーラを使う"
tags:
  - GCP
---

以前はyumでインストールしていたが更新しようとしたらエラーに阻まれ困ってしまったので調べたらインストーラがあるらしい

[Google Cloud SDK インストーラの使用  |  Cloud SDK のドキュメント](https://cloud.google.com/sdk/docs/downloads-interactive?hl=ja)

既存のパッケージマネージャーで使っているものを削除してから次のようにコマンドをたたくだけ

```shell
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

別途インストールされたディレクトリへのパスを追加する必要がある

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
特にエラーに阻まれることなくインストールできたので今後この方法で行こうと思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

本当インストールに時間掛けるの無駄以外の何物でもないので…