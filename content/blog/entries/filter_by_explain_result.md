---
title: "MySQLのgenerallogから特定のSQLを抜き出す"
date: "2021-02-26"
description: "いろいろやる"
tags:
  - MySQL
  - Python
  - AWS
---

AWSで稼働しているRDSからgeneral logを取ってきてそのクエリログから特定のクエリを抽出してExplainの結果を判定するということをやったのでそのときやったことをメモしておく

単発だったのでいくつか簡単なスクリプトを書いて対応したがしくみ化するならいろいろおもしろいかも

## 前提

ローカルからのフォワーディングや本番サーバなどから実行するなど本番のDBに接続できる必要がある

general logをファイルに出力する設定をしておく必要がある

## やること
### general logの取得

APIのドキュメントは下記

[Accessing Amazon RDS database log files - Amazon Relational Database Service](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.html)

直近24時間分のログが取れる

数値はUTC時刻の範囲で出力されるっぽいので`general/mysql-general.log.0`はJSTでは`09:00`台の内容

```shell
#!/bin/bash

aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.0  > 0.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.1  > 1.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.2  > 2.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.3  > 3.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.4  > 4.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.5  > 5.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.6  > 6.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.7  > 7.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.8  > 8.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.9  > 9.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.10 > 10.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.11 > 11.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.12 > 12.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.13 > 13.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.14 > 14.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.15 > 15.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.16 > 16.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.17 > 17.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.18 > 18.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.19 > 19.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.20 > 20.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.21 > 21.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.22 > 22.log
aws rds download-db-log-file-portion --db-instance-identifier hoge-db --starting-token 0 --output text --log-file-name general/mysql-general.log.23 > 23.log
```

### クエリのフォーマット、フィルタリング

general logの形式が次のような感じなのでクエリ部分を抜き出す必要がある

```
Time                 Id Command    Argument
                946458 Query    SELECT hoge FROM fuga....
```

[Mysql general log parser](https://gist.github.com/httpdss/948386)

<!-- textlint-disable prh,spellcheck-tech-word -->
からパーススクリプトを持ってきて配置し（mysql-general-log-parser.pl）次のようなシェルを書いた
<!-- textlint-enable prh,spellcheck-tech-word  -->

- filter_general_log.sh

```shell
file=$1

perl mysql-general-log-parser.pl $file | grep -v 'Your log message was truncated' | grep -v 'rds_heartbeat2' | grep -v 'rds_configuration' | grep -v 'mysql-connector-java' | grep -v 'EXPLAIN ' | sort | uniq > $file.query_list.txt
```

- 実行

```shell
ls -l {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23}.log | awk '{print $9}' | xargs -i ./filter_general_log.sh {}
```

### 生成したファイルをマージする

```
cat *.query_list.txt > query_list.txt
```

### 特定クエリの抽出

`GROUP BY`, `DISTINCT`を使用しているクエリを拾う

- filter_group_by_query.py

```python
import sqlparse
import sys

filepath = sys.argv[1]

f = open(filepath)
lines = f.readlines()
f.close()

for line in lines:
    parsed = sqlparse.parse(line)[0]
    tokens = list(parsed.flatten())
    is_grouped = filter(lambda t: t.match(sqlparse.tokens.Keyword, "GROUP\s+BY", regex=True), tokens)
    is_distinct = filter(lambda t: t.match(sqlparse.tokens.Name, "DISTINCT"), tokens)
    if len(list(is_grouped)) > 0 or len(list(is_distinct )) > 0:
        print(line)
```

- 実行

```shell
pip install sqlparse
python filter_group_by_query.py query_list.txt > group_by_query.txt
```

### チェック

explainの結果に`Using index for group-by`が含まれるものを抜き出す

- check_group_by_query.sh

```shell
#!/bin/bash

file=$1

cnt=0
cat $file | while read line
do
  cnt=`expr $cnt + 1`
  echo $cnt
  mysql -uhoge -P 13306 -h localhost -ppass dbname -e "EXPLAIN $line" | grep 'Using index for group-by'
  if [ $? -eq 0 ]; then
    echo "Found Query"
    echo $line
    echo $line >> result.txt
  fi
done
```

- 実行

```
sh check_group_by_query.sh group_by_query.txt
```

という感じでいくつかのクエリを探すようなことをした