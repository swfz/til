---
title: "WSL2でDockerForWindowsのコマンドを叩く"
date: "2021-04-27"
description: "/mnt/c経由のコマンドを叩く"
tags:
  - WSL
  - Docker
---

`docker compose`がたたけるようになったらしいのでWSL2からもたたいてみようということで

## 前提

自分はWSL側からWindowsのコマンドを使うことはできるがPATHは読み込ませないようにしている（シェルの起動速度が遅かったため）

- /etc/wsl.conf

```ini
[interop]
enabled=true
appendWindowsPath=false
```

## しらべた

WSLからWindows側のDocker関連のコマンドをたたく場合

`/mnt/c/Program\ Files/Docker/Docker/resources/bin/`以下にコマンド群がある

しかし`docker-compose`は`docker-compose`,`docker-compose.exe`と両方あるのに`docker`に関しては`docker.exe`しかなかった

`docker-compose`の中身を見たら環境によってたたくプログラムを変えているようだったので`docker`でも同じようなスクリプトを用意した

参考にしたファイルはいくつか分岐があったが自分が使う環境は条件分岐しなくても良いので決め打ちにした

- /mnt/c/Program\ Files/Docker/Docker/resources/bin/docker

```bash
#!/usr/bin/env sh
binary=$(basename "$0")
"$binary.exe" "$@"
```

- 実行してみる

```
$ /mnt/c/Program\ Files/Docker/Docker/resources/bin/docker compose --help
Docker Compose

Usage:
  docker compose [command]

Available Commands:
  build       Build or rebuild services
  convert     Converts the compose file to platform's canonical format
  create      Creates containers for a service.
  down        Stop and remove containers, networks
  events      Receive real time events from containers.
  exec        Execute a command in a running container.
  kill        Force stop service containers.
  logs        View output from containers
  ls          List running compose projects
  pause       pause services
  port        Print the public port for a port binding.
  ps          List containers
  pull        Pull service images
  push        Push service images
  restart     Restart containers
  rm          Removes stopped service containers
  run         Run a one-off command on a service.
  start       Start services
  stop        Stop services
  top         Display the running processes
  unpause     unpause services
  up          Create and start containers

Flags:
      --ansi string                Control when to print ANSI control characters ("never"|"always"|"auto") (default "auto")
      --env-file string            Specify an alternate environment file.
  -f, --file stringArray           Compose configuration files
  -h, --help                       help for compose
      --profile stringArray        Specify a profile to enable
      --project-directory string   Specify an alternate working directory
                                   (default: the path of the Compose file)
  -p, --project-name string        Project name

Use "docker compose [command] --help" for more information about a command.
```

これでWSL2側からWindowsの`docker`コマンドをたたけるようになった
