---
title: "WSL2上でDockerDesktopを使わなくなった後のエラー対応"
date: "2022-04-08"
description: "設定ファイルの変更が必要"
tags:
  - Docker
  - WSL2
---

DockerDesktopが有償化されてから使わないようにアンインストールしてUbuntu上のDockerを動かすようにしていたが先日下記のようなエラーが発生した

```
docker.credentials.errors.InitializationError: docker-credential-desktop.exe not installed or not available in PATH
```

そりゃアンインストールしていたらないだろっていう話ではあるがどこかでdockerを使うのにdesktop使うよっていう設定が残っているのかといろいろ調べた

調べた結果下記の参考ページのCredentialStoreの設定を削除する必要があった

- 参考

[DockerDesktopからWSL2上のみで動くDockerに移行する](https://zenn.dev/taiga533/articles/11f1b21ef4a5ff)


- ~/.docker/config.json

```json
"credsStore": "desktop.exe"
```

上記設定を削除して再度実行したらエラーが出なくなった
