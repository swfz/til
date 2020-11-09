---
title: "TerraformでGCSのバケットを作ってみる"
date: "2020-11-10"
description: "Terraform With Google(GCS)"
tags:
  - GoogleCloudPlatform
  - GCS
  - Terraform
---

とりあえず動かすところから

GCPでやってみる

## サービスアカウントの作成

GUIからある程度の権限をもたせて作成した

キーファイルのパスを`GOOGLE_CLOUD_KEYFILE_JSON`環境変数に格納する

```shell
export GOOGLE_CLOUD_KEYFILE_JSON=path_to/account.json
```

- ディレクトリ構成

```
.
├── provider.tf
├── README.md
├── storage.tf
└── version.tf

0 directories, 4 files
```

とりあえずのサンプルとしてフラットにした

- version.tf

```hcl
terraform {
  required_version = "~>0.13.5"
}
```

- provider.tf

```hcl
provider "google" {
  version = "~> 3.45.0"
  project     = "terraform-sample-1111111"
  region      = "asia-northeast1"
}

```

- storage.tf

```hcl
resource "google_storage_bucket" "private-bucket" {
  name          = "test-bucket-1234"
  location      = "asia-northeast1"
  storage_class = "REGIONAL"

  labels = {
    app = "test-app"
    env = "test"
  }
}
```

```shell
$ terraform init
```


```shell
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_storage_bucket.private-bucket will be created
  + resource "google_storage_bucket" "private-bucket" {
      + bucket_policy_only          = (known after apply)
      + force_destroy               = false
      + id                          = (known after apply)
      + labels                      = {
          + "app" = "test-app"
          + "env" = "test"
        }
      + location                    = "ASIA-NORTHEAST1"
      + name                        = "test-bucket-1111111"
      + project                     = (known after apply)
      + self_link                   = (known after apply)
      + storage_class               = "REGIONAL"
      + uniform_bucket_level_access = (known after apply)
      + url                         = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

```shell
$ terraform apply
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_storage_bucket.private-bucket will be created                                                                                               + resource "google_storage_bucket" "private-bucket" {
      + bucket_policy_only          = (known after apply)
      + force_destroy               = false
      + id                          = (known after apply)
      + labels                      = {
          + "app" = "test-app"
          + "env" = "test"
        }
      + location                    = "ASIA-NORTHEAST1"
      + name                        = "test-bucket-1234"
      + project                     = (known after apply)
      + self_link                   = (known after apply)
      + storage_class               = "REGIONAL"
      + uniform_bucket_level_access = (known after apply)                                                                                                  + url                         = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes
```

GUI上で確認して完了

単品であればドキュメント見ながら書くだけでOKなので簡単

個人的にはIAM周りがまだ良くわかっていないので素振りして理解を進めたい

- 参考

[Terraformツールを使ってGCPリソース管理 | DevSamurai](https://www.devsamurai.com/ja/gcp-terraform-101/)