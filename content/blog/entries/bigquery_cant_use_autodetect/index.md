---
title: "BigQueryのbq load時にautodetectを使えない場合"
date: "2021-05-08"
description: "データにばらつきがありautodetectが使えないパターン"
tags:
  - BigQuery
  - GoogleCloudPlatform
---

PocketのデータをAPIで取得してBigQueryに突っ込もうとしたときの話

GCSにJSONを置いてCLIから`bq load --autodetect`でデータをloadしようとしたらエラーで怒られた

```
BigQuery error in load operation: Error processing job
'project-111111:bqjob_r70118be7bda78ce4_000001793f9c2946_1': Error while reading
data, error message: JSON table encountered too many errors, giving up. Rows: 1;
errors: 1. Please look into the errors[] collection for more details.
Failure details:
- Error while reading data, error message: JSON processing
encountered too many errors, giving up. Rows: 1; errors: 1; max
bad: 0; error percent: 0
- gs://sample-bucket/preprocessed_rawdata/month=2021-05-01/raw-04.json: Error
while reading data, error message: JSON parsing error in row
starting at position 0: JSON object specified for non-record field:
list.videos
```

## 前提

現状あるデータは次の3つ（bucket名はサンプル）

```
gs://sample-bucket/preprocessed_rawdata/month=2021-05-01/raw-03.json
gs://sample-bucket/preprocessed_rawdata/month=2021-05-01/raw-04.json
gs://sample-bucket/preprocessed_rawdata/month=2021-05-01/raw-05.json
```

## 原因の切り分け

- raw-03.json
- raw-04.json

のときは問題なくloadできている

`raw-05.json`

が追加されてから上記エラーになってしまった

05と03,04のJSONの中身を比べてみたところ05には`list.videos`がすべて`[]`になっていた

03,04に関してはどこかのレコードでオブジェクトが入っていたので`RECORD`と判断された模様

このことから`--autodetect`は最初のファイルをautodetectで読み込んで順番にその他ファイルも読み込んでいると考えられる

[スキーマの自動検出](https://cloud.google.com/bigquery/docs/schema-detect?hl=ja#auto-detect)

ここに説明が書いてあった

> 自動検出を有効にすると、BigQuery はデータソース内でランダムにファイルを選択します。ファイルの最大 100 行をスキャンして代表的なサンプルとして使用し、推定プロセスを開始します。BigQuery は、各フィールドを検証し、そのサンプル内の値に基づいてそのフィールドにデータ型を割り当てようとします。

ランダムでファイルを読み込むとあるので全パターンを網羅したデータがあるファイルじゃないファイルがサンプルに選定されてしまった場合にこういうことが起きる

そうなると`autodetect`は使えないのでテーブル作成→loadの手順を踏む必要がある

- schemaの取り出し

うまく行ったパターンで生成したテーブルのスキーマを取得する

```shell
bq show --schema --format=prettyjson pocket.rawdata > pocket-rawdata.json
```

- テーブル作成

別のテーブルを用意して試してみる

```shell
bq mk --table --time_partitioning_field month --time_partitioning_type MONTH sample.pocket_rawdata pocket-rawdata.json
```

- load

```shell
bq load --source_format=NEWLINE_DELIMITED_JSON --replace sample.pocket_rawdata 'gs://sample-bucket/preprocessed_rawdata/*'
```

今のところこんな感じでなんとかなっている

## まとめ

取り込み対象のデータにばらつきがある（あるデータではRECORD、あるデータでは`[]`のようなとき）とサンプリング次第で取り込めない場合がある

さらに`--autodetect`+`--replace`を用いると毎回ロード時に自動検出するので失敗する可能性がある

そのためスキーマを定義してテーブルの作成+`bq load`と手順を踏む必要がある

## 所感

本来だったら`autodetect`で生成したスキーマからさらに精査して本当に`NULLABLE`?みたいな話も考えたほうが良いが今回は趣味プロジェクトなので…

autodetectは便利だけどこういうパターンに対応できないのでやはりPOCやお試しのときくらいしか使えないよなーとあらためて感じた

まぁでも気軽に試せるのはとても良いことなので使い分けが大事