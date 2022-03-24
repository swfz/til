---
title: "BigQueryの日付を扱う際のメモ"
date: "2022-03-25"
description: "スニペット的なやつ"
tags:
  - BigQuery
  - GoogleCloudPlatform
  - SQL
---

よく使うと思われるクエリをメモしておく

```sql
SELECT
DATE_TRUNC(CURRENT_DATE(), MONTH) AS first_day, # 月初
LAST_DAY(CURRENT_DATE(), MONTH) AS last_day, # 月末
DATE_TRUNC(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), MONTH) AS first_day_of_yesterday, # 前日起算の月初
LAST_DAY(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), MONTH) AS last_day_of_yesterday, # 前日起算の月末
DATE_TRUNC(DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH), MONTH) AS first_day_of_last_three_month # 3ヶ月前の月初
```

DATE_TRUNC, LAST_DAYが便利