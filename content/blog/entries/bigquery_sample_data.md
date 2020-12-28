---
title: "BigQueryでサンプルデータをサクッと作る"
date: "2020-12-09"
description: "WITH,UNNEST,ARRAY,STRUCTでやる"
tags:
  - BigQuery
  - SQL
---

簡易的にでもサンプルデータが欲しい場合、わざわざデータを入れ込まなくてもサンプルデータを生成できる

```sql
WITH sample AS(
  SELECT * FROM UNNEST(ARRAY<STRUCT<start_date DATE, end_date DATE, item STRING, sales INT64>>
    [
      ("2020-08-01", "2020-11-30", "hoge", 100),
      ("2020-10-01", "2020-10-31", "fuga", 200)
    ]
  )
)
SELECT * FROM sample
```

- 結果

|start_date|end_date|item|sales|
|---|---|---|---|
|2020-08-01|2020-11-30|hoge|100|
|2020-10-01|2020-10-31|fuga|200|


記事書くときや説明とかに使える
