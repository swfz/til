---
title: "MySQLでgzipをそのまま流し込む"
date: "2021-01-22"
description: ""
tags:
  - MySQL
---

- dump

一時的にファイルを生成せず圧縮したファイルを生成する

```shell
mysqldump -u user -p password dbname | gzip > dump.gz 
```

- リストア

gzファイルから直接MySQLに流し込む

```shell
zcat dump.gz | mysql -u user -p password dbname 
```
