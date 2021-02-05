---
title: "gcloudコマンド自体のタイムアウト設定"
date: "2021-02-05"
description: "--http-timeout"
tags:
  - GoogleCloudPlatform
---

cloud functionsでタイムアウトを最大の540秒に設定していたが`gcloud functions call`で手動実行していたら次のようなエラーが出た

```
ERROR: (gcloud.functions.call) ('The read operation timed out',)
This may be due to network connectivity issues. Please check your network settings, and the status of the service you are trying to reach.
```

gcloudのコマンド自体（APIコール）のタイムアウトは`--http-timeout`を設定すればよさそう

デフォルトだと300秒だった（気がする）

```shell
gcloud functions call sample_function --http-timeout 540
```

でよい

ドキュメントを見つけられなかったが…とりあえずこれでOKそう