---
title: "Hiveパーティショニングモードでbq load"
date: "2022-08-31"
description: "メモ"
tags:
  - BigQuery
  - Hive
  - GoogleCloudPlatform
---

Lakeにデータを置いた日付をBQ上でカラムとして扱いたかったのでHiveパーティショニングモードでbq loadした時のメモ

`${BUCKET_NAME}`, `${GOOGLE_PROJECT}`は適宜読み替える

最初に環境変数へ入れておいたりしておくとよいかも

```shell
export BUCKET_NAME=hoge
export GOOGLE_PROJECT=sample-project
```

- GCS側のディレクトリ構造

```shell
$ gsutil ls gs://${BUCKET_NAME}/items/
gs://${BUCKET_NAME}/items/dt=2022-02-15/
gs://${BUCKET_NAME}/items/dt=2022-02-25/
gs://${BUCKET_NAME}/items/dt=2022-02-26/
gs://${BUCKET_NAME}/items/dt=2022-02-27/
gs://${BUCKET_NAME}/items/dt=2022-03-04/
gs://${BUCKET_NAME}/items/dt=2022-04-01/
```

`xx=yy`という形式でオブジェクトを配置することでよしなにパーティショニングしてくれる

各ディレクトリにはCSVが置いてある

今回の例ではresponseというカラムにAPIのレスポンスがすべて入っているという感じ（JSON型を使ってみたかった）

- schema.json

```json
[
  {
    "mode": "NULLABLE",
    "name": "response",
    "type": "JSON"
  }
]
```

- load

```shell
bq load --replace --source_format=CSV \
  --hive_partitioning_mode=AUTO \
  --hive_partitioning_source_uri_prefix=gs://${BUCKET_NAME}/items/ \
  ${GOOGLE_PROJECT}:sample_datalake.test_raw_items "gs://${BUCKET_NAME}/items/*.csv" ./schema.json
```


- 結果

```shell
$ bq show --format=prettyjson sample_datalake.test_raw_items
{
  "creationTime": "1661458822114",
  "etag": "hODI6PUMYlQYOpdjjEYedQ==",
  "id": "sample-project:sample_datalake.test_raw_items",
  "kind": "bigquery#table",
  "lastModifiedTime": "1661458822114",
  "location": "asia-northeast1",
  "numActiveLogicalBytes": "27655304",
  "numBytes": "27655304",
  "numLongTermBytes": "0",
  "numLongTermLogicalBytes": "0",
  "numRows": "471",
  "numTotalLogicalBytes": "27655304",
  "schema": {
    "fields": [
      {
        "mode": "NULLABLE",
        "name": "response",
        "type": "JSON"
      },
      {
        "mode": "NULLABLE",
        "name": "dt",
        "type": "DATE"
      }
    ]
  },
  "selfLink": "https://bigquery.googleapis.com/bigquery/v2/projects/sample-project/datasets/sample_datalake/tables/test_raw_items",
  "tableReference": {
    "datasetId": "sample_datalake",
    "projectId": "sample-project",
    "tableId": "test_raw_items"
  },
  "type": "TABLE"
}
```

これでOK

`dt`を日付としてクエリできるようになった

### 参考

[外部パーティション分割データの読み込み  |  BigQuery  |  Google Cloud](https://cloud.google.com/bigquery/docs/hive-partitioned-loads-gcs?hl=ja#bq)
