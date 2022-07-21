---
title: "Dataportalで月毎に日平均値を計算する"
date: "2021-04-30"
description: "count_distinct"
tags:
  - DataPortal
  - GoogleCloudPlatform
---

こういうのはどうしてもView側で用意しないと計算できないのでメモしておく

- 計算フィールドを用意する

```
sum(hour)/count_distinct(start_date)
```

月ごとで1日あたりの時間数を取りたいのでこんな感じになる

SQLと一緒といえば一緒なので割と把握しやすい