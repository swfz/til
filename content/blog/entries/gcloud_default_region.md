---
title: "gcloudでデフォルトリージョンの設定"
date: "2020-11-09"
description: "add-metadata"
tags:
  - GoogleCloudPlatform
---

`gcloud`コマンドでいろいろ試していたりすると毎度リージョンを指定しわすれてUSになったりすることがあって面倒だったので調べた


- 設定の変更

```shell
$ gcloud compute project-info add-metadata \
    --metadata google-compute-default-region=asia-northeast1,google-compute-default-zone=asia-northeast1-a
```

- 確認

```
$ gcloud compute project-info describe --project sample-project-1111111
commonInstanceMetadata:
  fingerprint: 4HM7BFP53kU=
  items:
  - key: google-compute-default-region
    value: asia-northeast1
  - key: google-compute-default-zone
    value: asia-northeast1-a
  kind: compute#metadata
.....
.....
.....
```

- [デフォルト リージョンまたはゾーンの変更](https://cloud.google.com/compute/docs/regions-zones/changing-default-zone-region?hl=ja)