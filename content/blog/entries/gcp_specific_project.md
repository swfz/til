---
title: "Caller does not have permission"
date: "2020-12-10"
description: "エラーググりましょう"
tags:
  - GoogleCloudPlatform
---

GCRへのpushで次のようなエラーに遭遇した

```
 Token exchange failed for project 'terraform-sample-111111'. Caller does not have permission 'storage.buckets.create'. To configure permissions, follow instructions at: https://cloud.google.com/container-registry/docs/access-control
```

「バケット管理者」は付けているしなんでだろう…としばらく悩んだが

[docker push to Google Container Registry errors “Caller does not have permission 'storage.buckets.create'”](https://stackoverflow.com/questions/54496809/docker-push-to-google-container-registry-errors-caller-does-not-have-permission)

で言及されているようにプロジェクトを指定しろっていうだけの話だった

ちゃんとエラーググりましょう案件