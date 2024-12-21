---
title: S3利用料をバケット毎に詳細に出すための情報
date: "2020-07-18"
description: "使用量レポートと合わせて計算する"
tags:
  - AWS
  - S3
---

かなり面倒で分かりづらかったのでメモ程度に残しておく

## 手順
### 使用状況レポートをDLする
- [使用状況レポートのダウンロード](https://console.aws.amazon.com/billing/home#/reports/usage)
- 次の項目を指定する
    - サービス
    - 使用タイプ
    - オペレーション
    - 期間
    - 詳細度（粒度）

`Resource`列にバケット名が入ってくるので区別する

### 次の3点に関してそれぞれ使用状況レポートから計算する
- ストレージ容量
    - `TimedStorage-ByteHrs`などを対象
    - バイト時間を課金GB月に変換する
- リクエストカウント
    - `Requests-Tier2`などを対象
        - Tier1
        - Tier2
    - リクエストのタイプにより料金が違うのでそれぞれ集計し、1000リクエストごとの料金を掛け合わせる
- データ転送量
    - 次の3点を考慮して計算する
        - Outに関して料金が発生する
        - 月の使用量によってレートが変わる
        - インターネットかリージョンかでもレートが変わる
            - インターネット -> `DataTransfer-Out-Bytes`
            - リージョン間 -> `AWS-Out-Bytes`,`C3DataTransfer-Out-Bytes`
            - `S3G-DataTransfer-Out-Bytes`はリージョン間に該当すると思われる
            - Cloudfrontへの転送は料金がかからない
                - `CloudFront-Out-Bytes`

`使用レポート`の項目を読み込んで必要な項目だけ抜き出して計算する必要がある

## 参考

[AWS の Amazon S3 請求および使用状況レポートを理解する - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/aws-usage-report-understand.html)

[S3 バケットの請求および使用状況レポート - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/BucketBilling.html)

[Amazon S3 用の AWS 使用状況レポート - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/aws-usage-report.html)

[料金 - Amazon S3 ｜AWS](https://aws.amazon.com/jp/s3/pricing/?nc1=h_ls)
