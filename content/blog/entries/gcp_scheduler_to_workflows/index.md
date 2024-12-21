---
title: "Cloud Workflowsの実行をCloudScheduler経由で行う(パラメータ付き)"
date: "2021-03-30"
description: "executions"
tags:
  - GoogleCloudPlatform
  - CloudWorkflows
  - CloudScheduler
---

CloudSchedulerからCloudWorkflowsを実行するためのTips

[Cloud Scheduler の使用によるワークフローのスケジュール設定  |  Google Cloud](https://cloud.google.com/workflows/docs/schedule-workflow)

に単純に実行するだけのパターンは載っていたがWorkflowsの実行時にパラメータを渡すときどうするのかは書いていなかった

そのため単純に渡したいJSONを突っ込んだだけでは`INVALID_ARGUMENTS`で怒られた

そこで下記APIドキュメントを見てWorkflowをたたくためのJSONの中身を調べた

[REST Resource: projects.locations.workflows.executions  |  ワークフロー](https://cloud.google.com/workflows/docs/reference/executions/rest/v1beta/projects.locations.workflows.executions?hl=ja#Execution)

`argument`というキーにencodeしたJSON文字列をいれてたたくと意図通りパラメータが渡されるよう

ということでそういうJSONパラメータを作成してたたけるようにした

```json
{"argument":"{\"graph_id\":\"reading\",\"project_id\":156548296}"}
```

こんな感じ
