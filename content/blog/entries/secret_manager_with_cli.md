---
title: "SecretManagerの作成や更新をCLIで行う"
date: "2021-04-06"
description: "secrets versions add"
tags:
  - GoogleCloudPlatform
  - SecretManager
---

作成は`secrets`だけど更新は`secrets versions`に対しての操作が必要

- シークレットの作成

```shell
echo -n $TOKEN | gcloud secrets create HOGE_TOKEN --replication-policy=automatic --data-file=-
```

- シークレットの更新

```shell
echo -n $TOKEN | gcloud secrets versions add HOGE_TOKEN --data-file=-
```

echoのみだと末尾の改行も含まれてしまうので`-n`が必要

```
 -n     do not output the trailing newline
```
