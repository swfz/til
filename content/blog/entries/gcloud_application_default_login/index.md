---
title: "gcloudコマンドでTerraformが使用する認証情報のセットをサービスアカウント以外で行う"
date: "2021-03-31"
description: "auth application-default login"
tags:
  - Terraform
  - GoogleCloudPlatform
---

忘れてしまうのでメモ

```
gcloud auth application-default login
```

[gcloud auth login  |  Cloud SDK のドキュメント  |  Google Cloud](https://cloud.google.com/sdk/gcloud/reference/auth/login?hl=ja)

URLのリンクへ飛ぶと「○を許可しますか?」と聞かれる

許可すると認証コードを発行されるのでそれをコンソールに戻って入力すればOK

```
Go to the following link in your browser:


    https://accounts.google.com/o/oauth2/auth?response_type=code&...........

Enter verification code: 
```

```
Credentials saved to file: [/home/user/.config/gcloud/application_default_credentials.json]

These credentials will be used by any library that requests Application Default Credentials (ADC).
/home/sawafuji/google-cloud-sdk/lib/third_party/google/auth/_default.py:70: UserWarning: Your application has authenticated using end user credentials from Google Cloud SDK without a quota project. You might receive a "quota exceeded" or "API not enabled" error. We recommend you rerun `gcloud auth application-default login` and make sure a quota project is added. Or you can use service accounts instead. For more information about service accounts, see https://cloud.google.com/docs/authentication/
  warnings.warn(_CLOUD_SDK_CREDENTIALS_WARNING)

Quota project "sample-project-111111" was added to ADC which can be used by Google client libraries for billing and quota. Note that some services may still bill the project owning the resource.
```

別のアカウントで実行したら上書きされるようなので複数アカウントにまたいで作業をするマシンの場合は一応注意が必要ではある

認証情報のデフォルト設定を任意の場所に置く

確認したら下記だった

`$HOME/.config/gcloud/application_default_credentials.json`

そしてそこで生成された認証情報を使ってTerraformも実行できるようになる

なのでサービスアカウントではなくてもTerraformをたたくことができる

わざわざサービスアカウントでIAMの調整をしなくて良いので便利

CDでTerraformたたく感じでなければこの方法が楽で良さそう
