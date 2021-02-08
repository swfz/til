---
title: "CloudSQLへの接続方法"
date: "2021-02-08"
description: "cloud_sql_proxy使うだけ"
tags:
  - GoogleCloudPlatform
  - MySQL
---

## CloudShellからの接続

- CloudShellから接続する場合は簡単
- 該当プロジェクトでcloud shellを起動し`gcloud sql connect`で接続するだけ

```
$ gcloud sql connect mysql-instance --user=root
Allowlisting your IP for incoming connection for 5 minutes...done.
Connecting to database with SQL user [root].Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 351117
Server version: 5.7.25-google-log (Google)
Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql> show databases;
```

`gcloud sql connect ${instance name} --user=root`

これだけでOK

## ローカルからの接続

cloud_sql_proxyを使ってforwardingする

[Cloud SQL Proxy について  |  Cloud SQL for MySQL  |  Google Cloud](https://cloud.google.com/sql/docs/mysql/sql-proxy?hl=ja#install)

### インストール

Linux64ビットにしたがってやっていく

```shell
$ curl -LO https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64
$ chmod +x ./cloud_sql_proxy
$ mv ./cloud_sql_proxy /usr/local/bin/
```

### 実行

```shell
$ cloud_sql_proxy -instances=sample-project:us-west1:mysql-instance=tcp:13306
```

- フォーマット

```
-instances=${project name}:${region}:${instance name}=tcp:${forward port}
```

ローカルの`13306`ポートで接続できるようにした

### 接続

```
mysql -uroot -h 127.0.0.1  -P 13306 -p
```

これだけでOK