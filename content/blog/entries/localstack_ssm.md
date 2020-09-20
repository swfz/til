---
title: LocalStackを使う(SSMパラメータストア)
date: "2020-09-21"
description: "ssm"
tags:
  - AWS
  - LocalStack
---

## 準備

```
git clone https://github.com/localstack/localstack.git
cd localstack
docker-compose up -d
```

## SSM

パラメータストアのモックにも対応している

この機能を開発環境でモックできるのはうれしい

```shell
$ aws --profile localstack --endpoint-url=http://192.168.30.94:4583 ssm put-parameter --name 'test' --type "string" --value "hello" --region ap-northeast-1
{
    "Version": 1
}
```

```shell
$ aws --profile localstack --endpoint-url=http://192.168.30.94:4583 ssm get-parameters --name 'test' --region ap-northeast-1
{
  "Parameters": [
    {
      "Name": "test",
      "Type": "string",
      "Value": "hello",
      "Version": 1
    }
  ],
  "InvalidParameters": []
}
```

SecureStringも作れるっぽいが暗号化まではしてくれてない模様

AWSだとget-parametersで取得したValueは暗号化された値が出力される

```shell
$ aws --profile localstack --endpoint-url=http://192.168.30.94:4583 ssm put-parameter --name secure_key --type SecureString --value "XXXXXXXXXX" --region ap-northeast-1
{
    "Version": 1
}
```

```shell
$ aws --profile localstack --endpoint-url=http://192.168.30.94:4583 ssm get-parameters --name secure_key  --region ap-northeast-1
{
    "Parameters": [
        {
            "Name": "secure_key",
            "Type": "SecureString",
            "Value": "kms:default:XXXXXXXXXX",
            "Version": 1
        }
    ],
    "InvalidParameters": []
}
```

- 参考

[Secure String パラメータについて - AWS Systems Manager](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-paramstore-securestring.html)
