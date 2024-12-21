---
title: "BigQueryで特定データセットに権限を付与する"
date: "2022-10-12"
description: "bq show + bq update"
tags:
  - BigQuery
  - GoogleCloudPlatform
---

特定のデータセット、特定サービスアカウントにREADやWRITE権限を与える

`bq show`で対象データセットの設定を出力、中身の`access`に対象サービスアカウントのメールアドレスをと権限を追加して`bq update`

```shell
bq show --format=prettyjson memo-111111:sample  > sample.json
```

- sample.json

```json
"access": [
  ...
  ...
  ...
    {
      "role": "READER",
      "userByEmail": "github-actions-sample-nokey@memo-111111.iam.gserviceaccount.com"
    }
]
```

```shell
bq update --source sample.json sample
```

## 確認

対象サービスアカウントで実行した

- bq ls

```txt
  datasetId  
 ----------- 
  sample     
```

- クエリ

```shell
bq query --nouse_legacy_sql 'select * from sample.summary'
```

```
+------+-------+----+
| view | title | id |
+------+-------+----+
|    3 | fuga  |  2 |
|    3 | foo   |  4 |
|    4 | piyo  |  3 |
|    5 | hoge  |  1 |
|    5 | bar   |  5 |
+------+-------+----+
```

できた

最近GitHubActionsのOIDC認証でCI用のサービスアカウントに対してクエリできるようにする + データセット単位で権限を絞るところまで行ったのでメモ

個人使用ならこれで問題ないかなーという感じ