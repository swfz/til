---
title: "GitHub APIのRateLimit"
date: "2022-08-27"
description: "gh cli ratelimit"
tags:
  - GitHub CLI
---

GitHubのAPIを使いだすと割と早くRateLimitに引っかかる

- rate limit

```
gh: API rate limit exceeded for user ID xxxxxxxx.
```

そしてRateLimitにあたってしまったときに、いつ使えるようになるのか?が知りたい

GitHubのCLIにずばりそのものの機能がある

```
$ gh api rate_limit
{
  "resources": {
    "core": {
      "limit": 5000,
      "used": 58,
      "remaining": 4942,
      "reset": 1661532628
    },
    "search": {
      "limit": 30,
      "used": 0,
      "remaining": 30,
      "reset": 1661531080
    },
    "graphql": {
      "limit": 5000,
      "used": 4888,
      "remaining": 112,
      "reset": 1661532952
    },
    "integration_manifest": {
      "limit": 5000,
      "used": 0,
      "remaining": 5000,
      "reset": 1661534620
    },
    "source_import": {
      "limit": 100,
      "used": 0,
      "remaining": 100,
      "reset": 1661531080
    },
    "code_scanning_upload": {
      "limit": 1000,
      "used": 0,
      "remaining": 1000,
      "reset": 1661534620
    },
    "actions_runner_registration": {
      "limit": 10000,
      "used": 0,
      "remaining": 10000,
      "reset": 1661534620
    },
    "scim": {
      "limit": 15000,
      "used": 0,
      "remaining": 15000,
      "reset": 1661534620
    },
    "dependency_snapshots": {
      "limit": 100,
      "used": 0,
      "remaining": 100,
      "reset": 1661531080
    }
  },
  "rate": {
    "limit": 5000,
    "used": 58,
    "remaining": 4942,
    "reset": 1661532628
  }
}
```

各リソースごとにどのような状況かが返ってくる

各リソース部分の`reset`がいつリセットされるかのエポック秒となっている

なので`date`コマンドで変換して見てあげるといつか分かる

```
$ date -d @1661532952 +"%Y-%m-%d %H:%M:%S"
2022-08-27 01:55:52
```

つなげるとこんな感じ

```
$ gh api rate_limit | jq '.resources.graphql.reset' | xargs -i date -d @{} +"%Y-%m-%d %H:%M:%S"
2022-08-27 01:55:52
```

大人しく待ちましょう