---
title: "Lambdaのソースコード差分を取得する"
date: "2021-09-05"
description: "zipを解凍して差分を取る"
tags:
  - AWS
  - Lambda
---

プロダクションとステージングでコード差分がーとかそういうのを検知する目的でスクリプトを書いてた

そういえばこんなものも書いたなと言うことで供養がてら残しておく

- lambda-diff

```shell
#!/bin/bash

# lambda-diff profile FunctionName1 FunctionName2

get_lambda_zip(){
  curl -o /tmp/$2.zip `aws --profile=$1 lambda get-function --function-name $2 | jq -r '.Code.Location'`
}

unzip_lambda_code(){
  unzip -p /tmp/$1.zip | cat -
}

get_lambda_zip $1 $2
get_lambda_zip $1 $3

diff -u -w <(unzip_lambda_code $2) <(unzip_lambda_code $3)
```

ファイルが複数存在する場合の考慮はしていない（できるかもためしていない）

Nodeだとindex.jsだけで完結する場合に差分を検出できる

Lambdaの設定差分だけであればコマンド一発で書ける（当時は自動化するためにスクリプト化してた）

- lambda-config-diff

```shell
#!/bin/bash

# lambda-config-diff profile FunctionName1 FunctionName2

diff -u -w <(aws --profile=$1 lambda get-function-configuration --function-name $2) <(aws --profile=$1 lambda get-function-configuration --function-name $3)
```

このスクリプトを定期的に実行して差分があればメールなりSlackなりに通知したりして差分が出た!みたいなのを検知できる