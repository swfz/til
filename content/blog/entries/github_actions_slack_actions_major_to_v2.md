---
title: "GitHub ActionsのSlack Actionがメジャーバージョン更新されていた(v2)"
date: "2024-12-02"
description: "desc"
tags:
  - GitHubActions
  - Slack
---


下記はActionsの実行ログから

```
Run slackapi/slack-github-action@v2.0.0
  with:
    payload: {
    "text": "Algolia Index",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "hatenablog(486) 2024-11-24T21:06:29.404Z\nmemo(197) 2024-11-14T21:07:11.449Z\nobsidian(426) 2024-11-22T21:06:31.679Z\nsandbox(1) 2024-09-18T05:45:57.228Z\ntil(209) 2024-11-21T21:09:12.200Z"
        }
      }
    ]
  }
  
    errors: false
    payload-templated: false
    retries: 5
  env:
    SLACK_WEBHOOK_URL: ***
    SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

file:///home/runner/work/_actions/slackapi/slack-github-action/v2.0.0/src/config.js:160
          throw new SlackError(
^
SlackError: Missing input! The webhook type must be 'incoming-webhook' or 'webhook-trigger'.
    at Config.validate (file:///home/runner/work/_actions/slackapi/slack-github-action/v2.0.0/src/config.js:160:1)
    at new Config (file:///home/runner/work/_actions/slackapi/slack-github-action/v2.0.0/src/config.js:113:1)
    at send (file:///home/runner/work/_actions/slackapi/slack-github-action/v2.0.0/src/send.js:13:1)
    at file:///home/runner/work/_actions/slackapi/slack-github-action/v2.0.0/src/index.js:9:1
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at ModuleLoader.import (node:internal/modules/esm/loader:316:24)
    at asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5)
```

いつも通りにRenovateで来たPRをマージしていたらいつの間にかWorkflowでエラーが発生していた（メールで気付いた）

[Release Slack Send v2.0.0 · slackapi/slack-github-action](https://github.com/slackapi/slack-github-action/releases/tag/v2.0.0)

変更点は上記

WorkflowBuilder、SlackAPI、IncommingWebhookの3点で破壊的変更があったよう

今までの設定で動かないケースが多くありそう

自分はIncommingWebhookのみしか使っていなかったので次の変更点があった

## Webhook-typeの明示

今までは省略できたが、明示的にタイプを指定してねという話らしい

```
webhook-type: incoming-webhook
```

## Webhook urlの指定方法

```
webhook: ${{ secrets.SLACK_WEBHOOK_URL }}
```

今までは環境変数にセットして読ませてた、推奨設定は上記のように直接指定することらしい

こちらは今までの環境変数から読ませる設定でも動いた

でも推奨設定にしたほうがよいだろうな

自分はそこまで変更量多くなかったけどたくさん使っている人はたいへんそう…
