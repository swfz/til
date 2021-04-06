---
title: "Terraform+GCSでバックエンドの設定をCLIで行う"
date: "2021-04-07"
description: "backend-config"
tags:
  - Terraform
  - GoogleCloudPlatform
  - GCS
---

環境ごとにバックエンドの設定を変えたりする場合などに有効

- backend.tf

```terraform
terraform {
  backend "gcs" {
  }
}
```

## ファイルから設定する

- backend-config.tfvars

```tfvars
bucket = "hoge-tfstate"
prefix = "prefix-hoge"
```

```shell
terraform init -backend-config=backend-config.tfvars
```

## コマンドラインから設定する

```shell
terraform init -backend-config="bucket=hoge-tfstate" -backend-config="prefix=prefix-hoge"
```
