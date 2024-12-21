---
title: "JSONファイルをBigQueryに読ませJSON型で扱うためにそのままCSVで保存する"
date: "2022-02-28"
description: "jq"
tags:
  - jq
  - BigQuery
  - GoogleCloudPlatform
---

[Working with JSON data in Standard SQL  |  BigQuery  |  Google Cloud](https://cloud.google.com/bigquery/docs/reference/standard-sql/json-data)

先日BigQueryでnative JSON型がプレビューでサポートされた

執筆時点ではloadはCSVしか対応していないようだったのでJSONのファイルはCSVに変換する必要がある

とりあえず使ってみるためにJSONを返すAPIのレスポンスをまるまるCSVにして突っ込んでみることにした

```
cat hoge.json| jq -r '[.|tostring]|@csv' > hoge.csv
```

- schema.json

```json
[
  {
    "mode": "NULLABLE",
    "name": "data",
    "type": "JSON"
  }
]
```

### load

```
bq load --replace --source_format=CSV ${GOOGLE_PROJECT}:sample.content_text hoge.csv ./schema.json
```

これでJSON型を使えるようになった

1ファイル1レコードという力技だが扱う容量が多くなければこの方法でもいける

何度かSQLたたいてみたけどSTRUCTやREPEATEDなど今まで型でサポートしてくれていた部分を考慮してあげないといけない

なのでいったん特定のカラムを抜き出す工程みたいなのが必要

配列も`JSON_QUERY_ARRAY`を挟んであげる必要があるなどまぁそうだよなという感じ

load対象がJSONファイルで特定のキー以下をJSON型として扱うということができるようになってほしいと感じた

現状だと上記のようにひと手間かけないといけないのでデータレイク的なところから一次整形処理を挟む必要が出てくるのでまだちょっと使いづらいなーという感じ