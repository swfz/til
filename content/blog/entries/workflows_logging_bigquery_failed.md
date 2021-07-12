---
title: "Workflowsで Memory usage limit exeeded"
date: "2021-07-13"
description: "失敗記録"
tags:
  - Workflows
  - GoogleCloudPlatform
---

はてなブログのAPIなど公開のAPIをたたいてそのレスポンスをそのままBigQueryに突っ込むみたいなやつ

プライベートなのと規模感が小さいのでちょっと冒険的な感じでやってみようと次のような構成で試みた

- Workflowsではてなブックマークの公開APIをたたく
- WorkflowsのログにAPIのレスポンスをそのまま流す
- Logging→集約シンクでBigQueryにレコードを追加する

Functionsを新たに作らなくても良いしとりあえずの生データも保存できるしわりと省力で実現できるかと考えた

ある程度動作確認して問題なかったので自分のブログの全URLで実行したら次のようなエラーが出てしまった

```shell
Execution failed or cancelled.
in step "call_workflow_api", routine "call_workflow", line: 88
in step "collect_hatena_bookmark_workflow", routine "main", line: 35
{
  "message": "Execution failed or cancelled.",
  "operation": {
    "argument": "{\"target_url\":\"https://swfz.hatenablog.com/entry/2018/12/22/080733\"}",
    "endTime": "2021-07-10T12:01:03.749667278Z",
    "error": {
      "payload": "{\"message\":\"ResourceLimitError: Memory usage limit exceeded\",\"tags\":[\"ResourceLimitError\"]}",
      "stackTrace": {}
    },
    "name": "projects/1111111111111/locations/us-central1/workflows/collect_hatena_bookmark_metrics/executions/c4a686eb-4d92-4e95-94f6-4257438131e0",
    "startTime": "2021-07-10T12:01:02.693637032Z",
    "state": "FAILED",
    "workflowRevisionId": "000001-331"
  },
  "tags": [
    "OperationError"
  ]
}
```

バズって300前後のブックマークが付いたURLのレスポンスで発生した

[割り当てと上限  |  ワークフロー  |  Google Cloud](https://cloud.google.com/workflows/quotas)

変数のメモリ割り当てにも上限があり64KBまでらしい

なのでAPIのレスポンスが64KB以上ある場合はエラーになってしまう…

Functionsは経由するがFunctionsからLoggingへ直接流すようにするか?と思ったが

[割り当てと上限  |  Cloud Logging  |  Google Cloud](https://cloud.google.com/logging/quotas?hl=ja)

同じようにLoggingにも割り当て上限があるのでこの辺も考慮できていないといけない

この辺まで調べて面倒になってきてしまいこの手法は諦めた

メモリリミットに達してしまったため回避方法はなさそう…APIのレスポンスをそのままWorkflows上でよしなにやるパターンは厳しいという結論になりました

Workflowsはあくまで各処理のオーケストレーションなのでWorkflows内にあまり処理を持ち込むべきではないっていう考え方なのかなと推測

結局こういうパターンはFunctionsでGCSにデータ置く+BigQueryへloadってパターンがベターなのかな