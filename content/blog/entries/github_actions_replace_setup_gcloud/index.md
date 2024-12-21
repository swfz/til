---
title: "gcloudのActionsを差し替える"
date: "2021-05-14"
description: "書き換えるだけ"
tags:
  - GitHubActions
---

普段のGitHubActionsでログを見ていたら次のようなメッセージが出ていた

```
Thank you for using setup-gcloud Action. GoogleCloudPlatform/github-actions/setup-gcloud has been deprecated, please switch to google-github-actions/setup-gcloud.
```

ということで、既存の`setup-gcloud`を`google-github-actions/setup-gcloud`に移行する

既存で`uses`している部分を書き換えるだけでOK

- before

```
GoogleCloudPlatform/github-actions/setup-gcloud@v0.2.1
```

- after

```
google-github-actions/setup-gcloud@v0.2.1
```
