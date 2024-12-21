---
title: gcloudコマンドのインストール
date: "2020-10-30"
description: "インストーラを使う"
tags:
  - GoogleCloudPlatform
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

## 追記（2020-12-03）

上記だけだと`bq`や`gsutil`が入らなかったので次の方法のほうが良いかも

[Google Cloud SDK のインストール  |  Cloud SDK のドキュメント](https://cloud.google.com/sdk/docs/install?hl=JA#installation_instructions)

```shell
$ curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-319.0.0-linux-x86_64.tar.gz
$ tar zxvf google-cloud-sdk-319.0.0-linux-x86_64.tar.gz
$ cd google-cloud-sdk
$ ./google-cloud-sdk/install.sh
```

## 追記（2022-06-25）

`version 391`ではインストールスクリプトの置き場所が変わってた

```shell
$ curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-391.0.0-linux-x86_64.tar.gz
$ tar zxvf google-cloud-sdk-391.0.0-linux-x86_64.tar.gz
$ cd google-cloud-sdk
$ ./install.sh
```