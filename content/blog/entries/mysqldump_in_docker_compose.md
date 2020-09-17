---
title: docker-composeからmysqldumpコマンドを実行する
date: "2020-09-18"
description: "exec -Tを使う"
tags:
  - Docker
  - MySQL
---

docker-composeからmysqldumpやdumpファイルの入れ込みを行う

- dump

```shell
docker-compose exec database mysqldump -u root -phoge hoge > develop.sql
```

- 入れ込み

```shell
docker-compose exec -T database mysql -u root -phoge hoge < hoge_dump.sql
```

`-T` がポイント

```
    -T                Disable pseudo-tty allocation. By default `docker-compose exec`
                      allocates a TTY.
```
