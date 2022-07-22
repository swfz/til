---
title: "BigQueryでStringの空配列を生成する"
date: "2022-07-22"
description: "ARRAY"
tags:
  - BigQuery
  - GoogleCloudPlatform
---

[配列関数  |  BigQuery  |  Google Cloud](https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions?hl=ja)

GENERATE_ARRAYで作るとINT64の空配列になってしまう

```sql
SELECT GENERATE_ARRAY(1,0,1) AS tags
```

UNIONなどで文字列の配列と結合させようとすると型が合わなくなってしまう

## 例

```sql
SELECT ['a','b'] AS tags
UNION ALL
SELECT GENERATE_ARRAY(1,0,1) AS tags
```

- 結果

```
 Column 1 in UNION ALL has incompatible types: ARRAY<STRING>, ARRAY<INT64> at [3:1] 
```

[Create empty string array BigQuery - Stack Overflow](https://stackoverflow.com/questions/58504188/create-empty-string-array-bigquery)

こまったときのstackoverflow、答えが書いてありました

```sql
SELECT ARRAY<STRING>[] AS tags
```

でSTRINGの空配列を生成できる

解決！
