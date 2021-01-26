---
title: "gcloud buildsでログが見れない時"
date: "2021-01-25"
description: "project roleも確認しよう"
tags:
  - GoogleCloudPlatform
---

CloudRunでCDやろうと思ったらつまずいた

サービスアカウントにコンテナのイメージをビルドさせたいときの話

```
$ gcloud builds submit --tag gcr.io/${project-id}/${name}
Check the gcloud log [/home/circleci/.config/gcloud/logs/2020.12.10/18.23.37.852071.log] to see which files and the contents of the default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn                                                                           more).
.....
.....
.....
ERROR: (gcloud.builds.submit) HTTPError 403: <?xml version='1.0' encoding='UTF-8'?><Error><Code>AccessDenied</Code><Message>Access denied.</Message><Details>name-run-invoker@project-id.iam.gserviceaccount.com does not have storage.objects.get access to the Google Cloud Storage object.</Details></Error>
```

サービスアカウントには`storage.objects.get`は付いているのに…

[ビルド結果の表示  |  Cloud Build のドキュメント  |  Google Cloud](https://cloud.google.com/cloud-build/docs/view-build-results#gcloud)

特にログのバケットを指定してないため、ログを表示するにはプロジェクト＞閲覧者の権限も必要なよう

いわゆる`roles/viewer`

## projectの閲覧者権限の追加

[個人的によく使うgcloudコマンドまとめ ~ IAM・サービスアカウント関連 ~](https://qiita.com/rodotan/items/9a97dbffd8cd0bbd3ae9)

```shell
gcloud projects add-iam-policy-binding ${project-id} --member=serviceAccount:${name}-run-invoker@${project-id}.iam.gserviceaccount.com --role=roles/viewer
```

これで解決した

なんとなくプロジェクトにまつわる権限の話がわかってきた気がするがはっきり説明できるほどにはなっていない…