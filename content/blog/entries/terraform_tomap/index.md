---
title: "Terraformの配列で複数CloudRunのURLをOutPutする"
date: "2021-04-08"
description: ""
tags:
  - Terraform
---

0.12以降ではresourceに対しても繰り返しの構文が使えるようなので使ってみた一例

CloudRunを複数作ってEndpointのURLをOutPutに設定する

CloudRun単一の場合URLは次のように取得する

```
google_cloud_run_service.app.status[0].url
```

複数ある場合は次のようにしてmapにする

```hcl
output url {
  value = tomap({ for k,v in google_cloud_run_service.app : k => v.status[0].url})
}
```

outputはこんな感じ

```
url = {
  "hoge" = "https://sample-cloudrun-hoge-hogehoge-an.a.run.app"
  "fuga" = "https://sample-cloudrun-fuga-hogehoge-an.a.run.app"
}
```

という感じで取得できる
