---
title: "BigQueryで日付を扱うときはTimezoneを意識する"
date: "2021-04-21"
description: "基本はUTCですねという話"
tags:
  - BigQuery
  - GoogleCloudPlatform
---

dataformでsourceテーブルから中間テーブルを生成してassertionを書いていた

検算したら件数が合わないなーということで調べた

次のようなSQLで`from`,`to`を指定して単月分のレコードのみ抜き出すというパターン

```sql
SELECT
  *,
  'private' AS workspace
FROM
  `sample.rawdata-private`,
  UNNEST(data) AS d
WHERE
  DATE(start) BETWEEN ${target_date.from}
  AND ${target_date.to}
```

<!-- textlint-disable prh -->
SQLXなので`target_date.to`と`target_date.from`はその時々によって変化する
<!-- textlint-enable prh -->

今回は`2021-04-01` ～ `2021-04-30`をという感じ

`rawdata-private`はAPIのレスポンスをそのまま保存していて1行に`total_count`と`data`列に実際のレコードがあるので`UNNEST`してレコード数と比較することで確認している

`rawdata-private`のレコードを追ってみると

```json
"start": "2021-04-01T04:57:39+09:00",
```

のデータが`DATE(start)`を通すことで`2021-03-31`になっていた

なるほどUTC

`DATE(start, 'Asia/Tokyo'),`でタイムゾーン指定の日付データに変換できるのでこれで対応

BigQueryがDATEでよしなにやってくれた結果UTCで解釈すると`2021-03-31`となってしまうためフィルタ対象から外れてしまい、件数が合わない状態になっていた

正直assertion書いてなかったら気付かなかったのでassertion大事w