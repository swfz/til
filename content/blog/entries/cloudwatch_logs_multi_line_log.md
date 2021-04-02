---
title: "CloudWatchLogsで複数行またいだログを適切に扱う"
date: "2021-04-02"
description: "multi_line_start_parttern"
tags:
  - AWS
  - CloudWatchLogs
---

CloudWatchLogsエージェントを使ってログを集める際のはなし

Railsのログから`FATAL`,`ERROR`などのログだけ抽出してSlackに投げようというような運用はよくある

CloudWatchLogsにログを集めて行う場合はLogsのサブスクリプションフィルタを使って対象を絞ってLambdaなどを介して通知する

が、スタックトレースを伴うエラーなどのログは改行が含まれているのでデフォルトの設定だと1行1行が別々のログとして扱われてしまう

複数行のログでも1つのまとまりとして扱いたい

そこで`multi_line_start_pattern`の設定をする

## 設定

オプションはこの正規表現にマッチする行がスタートですよという意味合い

Fluentdとかでもこういうのあったね

[CloudWatch Logs エージェントのリファレンス - Amazon CloudWatch Logs](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/AgentReference.html)

- /opt/aws/amazon-cloudwatch-agent/bin/config.json

```json
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/path/to/log/hoge.log",
            "log_group_name": "/cwl-test/dev/rails",
            "log_stream_name": "{instance_id}",
            "multi_line_start_pattern": "[F|E|W|I|D], .*"
          }
        ]
      }
    }
  },
```

`Rails.logger`を通してログを出力した場合は基本的にログ1件の単位が上記の正規表現で対応できる状態になる

こんなログが1件として扱われる

```
F, [2021-04-02T17:40:01.079206 #21599] FATAL -- : 
ActionController::RoutingError (No route matches [GET] "/hoge"):
.....
.....
.....
```
