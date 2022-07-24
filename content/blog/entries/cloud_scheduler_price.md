---
title: "CloudSchedulerの料金"
date: "2022-07-24"
description: "1アカウントにつき3つまで無料"
tags:
  - GoogleCloudPlatform
  - CloudScheduler
---

[料金  |  Cloud Scheduler  |  Google Cloud](https://cloud.google.com/scheduler/pricing?hl=ja)

これがすべてなんだけどしっかり把握していなかったので個人で毎月料金掛かっているものがあった

## 2022-07-24時点

- ジョブの稼働ではなく作った段階で課金対象となる
- アカウントにつき3つまで無料（プロジェクト単位ではない）
- それ移行は`$0.10/月`

Terraformでサンプル作ったりしてそのまま放置しているのが結構あったので馬鹿にならない感じ

サンプルとかで使ったら後片付けをしましょうね、気を付けます
