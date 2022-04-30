---
title: "CloudFrontのキャッシュをクリアする"
date: "2022-05-01"
description: "memo"
tags:
  - AWS
  - CloudFront
---

メモ

`hogehoge.cloudfront.net`は実行時適切なものに割り当てる

```
# DISTRIBUTION_IDの取得
$ export DISTRIBUTION_ID=$(aws cloudfront list-distributions --query 'DistributionList.Items[]' | jq -r '.[]|select(.DomainName="hogehoge.cloudfront.net")|.Id')
# INVALIDATION_IDの取得、invalidationでキャッシュの削除を行う、非同期処理のためIDを取得しておく
$ export INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" | jq -r '.Invalidation.Id')
# チェック、Completeになっていれば完了
$ aws cloudfront get-invalidation --distribution-id ${DISTRIBUTION_ID} --id ${INVALIDATION_ID}
```
