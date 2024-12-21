---
title: "AWSの請求書の金額と同じ値を取得するためのワンライナー"
date: "2021-09-08"
description: "UnblendedCost"
tags:
  - AWS
---

`AWSのサービスの料金`と同じ値を出す

```shell
last_month=2021-08-01
this_month=2021-09-01
aws ce get-cost-and-usage --granularity MONTHLY --metrics UnblendedCost --region us-east-1  --time-period Start=${last_month},End=${this_month}| jq -r '.ResultsByTime[0].Total.UnblendedCost.Amount' | xargs printf '%.2f'
```

で、8月分のAWSサービス料金が取得できる

## get-cost-and-usage

コストエクスプローラで閲覧できる値をCLIからたたける

ドキュメントは下記

[get-cost-and-usage — AWS CLI 1.20.36 Command Reference](https://docs.aws.amazon.com/cli/latest/reference/ce/get-cost-and-usage.html)

気を付けるのはregionが`us-east-1`で固定なことくらい

## bashで小数点第2位で四捨五入する

printfはCの書式でフォーマットを記述する

```shell
$ printf '%.2f' 2.222
2.22
$ printf '%.2f' 2.225
2.23
```

四捨五入なら上記でOK

## pipeで受け取った値をprintfする

```shell
$ echo -n 2.225 | xargs printf '%.2f'
2.22
```

ん?.....

```shell
$ echo 2.2251 | xargs printf '%.2f'
2.23
$ echo 2.2250000000 | xargs printf '%.2f'
2.22
$ echo 2.22500000001 | xargs printf '%.2f'
2.23
```

printfだと精度の問題があるみたい

小数点第2位で四捨五入するパターンの場合

小数点第3位がちょうど5の場合は期待する値にならない

なので別の方法を検討する必要がある

が、今回はcliで取得できる値を見た感じこの減少にほぼ当たらないだろうと判断してこのままやることにした
