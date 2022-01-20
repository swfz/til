---
title: "GitHub Projects(beta)のデータを収集する"
date: "2022-01-21"
description: "Explorerが便利"
tags:
  - GitHub
  - GraphQL
---

GitHubのProjects（Beta）を使って自動化や集計をするなどしたい場合のメモ

APIの基本的な使い方に関しては下記を参照し、1つずつ実行していけばイメージはつかめる

[APIを使ったプロジェクト（ベータ）の管理 - GitHub Docs](https://docs.github.com/ja/issues/trying-out-the-new-projects-experience/using-the-api-to-manage-projects)

事前にProjectのIDだけ取得しメモしておく

次のクエリ一発でだいたい必要なデータは取れそう

```graphql
query ($project_id: ID!) {
  node(id: $project_id) {
    ... on ProjectNext {
      items(first: 100) {
        nodes {
          title
          createdAt
          fieldValues(first: 8) {
            nodes {
              value
              createdAt
              projectField {
                name
                settings
              }
            }
          }
          content {
            ... on Issue {
              id
              number
              url
              repository {
                name
              }
              milestone {
                id
                title
              }
              createdAt
              closed
              closedAt
              assignees(first: 5) {
                nodes {
                  name
                }
              }
            }
            ... on PullRequest {
              id
              number
              url
              assignees(first: 5) {
                nodes {
                  name
                }
              }
              repository {
                name
              }
              createdAt
              closed
              closedAt
              merged
              mergedAt
              reviewRequests(first: 10) {
                nodes {
                  requestedReviewer {
                    ... on User {
                      name
                    }
                  }
                }
              }
            }
          }
          id
          updatedAt
        }
      }
    }
  }
}
```

project_idは事前にメモしておいた値

どのカラムが必要かなどは下記で`Explorer`を展開して1つずつ見ていけば把握できる

[Explorer - GitHub Docs](https://docs.github.com/ja/graphql/overview/explorer)

Explorerのiframeの範囲が狭くて見づらいのがちょっと不満ではあるがそれ以外は便利に使える

カードに紐づくIssueやPullRequestなどの情報も取ってこれるのでフラットにして集計する前のデータとして使える

とりあえずプロジェクトのデータ使って云々やりたい場合はこのくらいデータが有れば十分かなと感じる

- 結果（一部抜粋）

```json
{
  "data": {
    "node": {
      "items": {
        "nodes": [
          {
            "title": "timerの時刻がブラウザの負荷状況によってずれる",
            "id": "PNI_xxxxxxxxxxxxxxxxxxxx",
            "updatedAt": "2022-01-19T06:12:59Z",
            "fieldValues": {
              "nodes": [
                {
                  "value": "timerの時刻がブラウザの負荷状況によってずれる",
                  "projectField": {
                    "name": "Title",
                    "settings": "{\"width\":319}"
                  }
                },
                {
                  "value": "98236657",
                  "projectField": {
                    "name": "Status",
                    "settings": "{\"width\":125,\"options\":[{\"id\":\"xxxxxxx1\",\"name\":\"New\",\"name_html\":\"New\"},{\"id\":\"xxxxxxx2\",\"name\":\"Epic\",\"name_html\":\"Epic\"},{\"id\":\"xxxxxxx3\",\"name\":\"Idea\",\"name_html\":\"Idea\"},{\"id\":\"xxxxxxx4\",\"name\":\"Todo\",\"name_html\":\"Todo\"},{\"id\":\"xxxxxxx5\",\"name\":\"In Progress\",\"name_html\":\"In Progress\"},{\"id\":\"xxxxxxx6\",\"name\":\"Review\",\"name_html\":\"Review\"},{\"id\":\"xxxxxxx7\",\"name\":\"Done\",\"name_html\":\"Done\"}]}"
                  }
                },
                {
                  "value": "2",
                  "projectField": {
                    "name": "Point",
                    "settings": "{\"width\":69}"
                  }
                },
                {
                  "value": "2022-01-01T00:00:00+00:00",
                  "projectField": {
                    "name": "Month",
                    "settings": "null"
                  }
                },
                {
                  "value": "e9bbecfa",
                  "projectField": {
                    "name": "Iteration",
                    "settings": "{\"configuration\":{\"duration\":14,\"start_day\":1,\"iterations\":[{\"id\":\"xxxxxxa\",\"title\":\"2022-01_2\",\"duration\":14,\"start_date\":\"2022-01-17\",\"title_html\":\"2022-01_2\"},{\"id\":\"xxxxxxb\",\"title\":\"2022-02_1\",\"duration\":14,\"start_date\":\"2022-01-31\",\"title_html\":\"2022-02_1\"},{\"id\":\"xxxxxxc\",\"title\":\"2022-02_2\",\"duration\":14,\"start_date\":\"2022-02-14\",\"title_html\":\"2022-02_2\"}],\"completed_iterations\":[{\"id\":\"xxxxxxd\",\"title\":\"2022-01_1\",\"duration\":14,\"start_date\":\"2022-01-03\",\"title_html\":\"2022-01_1\"},{\"id\":\"xxxxxxe\",\"title\":\"Iteration 1\",\"duration\":7,\"start_date\":\"2021-12-27\",\"title_html\":\"Iteration 1\"}]}}"
                  }
                }
              ]
            },
            "content": {
              "id": "I_xxxxxxxxxxxxxxxx",
              "number": 56,
              "url": "https://github.com/swfz/tools/issues/56",
              "closed": true,
              "closedAt": "2022-01-20T16:27:38Z",
              "createdAt": "2022-01-19T06:12:59Z",
              "repository": {
                "name": "tools"
              },
              "milestone": null,
              "assignees": {
                "nodes": [
                  {
                    "name": "swfz"
                  }
                ]
              }
            }
          },
          .....
          .....
          .....
          .....
```

また、実際にこのデータを用いて何かやるなら100件以上のデータが存在することのほうが多いはずなのでページングにも対応したクエリにする必要があるが今回はここまで
