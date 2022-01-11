---
title: "Docker環境でAnsibleのget_url実行が失敗する"
date: "2022-01-10"
description: "docker-composeでDNSの指定"
tags:
  - Docker
  - docker-compose
---

新しい開発環境ではAnsibleでローカル環境を作るようにしているが次のようにansibleの`get_url`実行に失敗してしまっていた

```
fatal: [localhost]: FAILED! => {"changed": false, "msg": "Failed to connect to objects.githubusercontent.com at port 443: [Errno -5] No address associated with hostname"}
```

名前解決ができていないという状態のようだったのでDNSサーバを指定してあげれば良い

- docker-compose.yml

```yaml
version: "3"
services:
  app:
    build:
      context: ./ansible
    dns:
      - 8.8.8.8
```

上記のように`dns`を指定することで解決した

