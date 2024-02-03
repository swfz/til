---
title: "JIRAのAPIを使ってIssueの情報を取得する"
date: "2024-02-02"
description: ""
tags:
  - JavaScript
  - JIRA
---

主にドキュメントはこの辺

[The Jira Cloud platform REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get)

JIRAのIssueデータを取得するコード

```javascript
const fs = require('fs');
const dayjs = require('dayjs');

const username = process.env.EMAIL;
const token = process.env.CONFLUENCE_API_TOKEN;
const buffer = Buffer.from(`${username}:${token}`);
const auth = buffer.toString('base64');
const projectName = 'HOGE'

const PAST_DAYS = 160;

const request = async(path, params) => {
  const url = new URL(`https://${process.env.ATLASSIAN_DOMAIN}/${path}`);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  console.log(url.toString());

  return await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json'
    }
  }).then(res => res.json());
}

const fetchIssues = async(startAt = 0) => {
  const data = await request(`rest/api/3/search`, {
    jql: `project = ${projectName} AND status = Done AND updated >= -${PAST_DAYS}d`,
    startAt,
    expand: 'changelog',
  })

  console.log(`startAt: ${data.startAt}, maxResults: ${data.maxResults}, total: ${data.total}`);

  const issues = data.issues.map(issue => {
    return {
      key: issue.key,
      id: issue.id,
      timeestimate: issue.fields.timeestimate,
      timespent: issue.fields.timespent,
      title: issue.fields.summary,
      created: issue.fields.created.split('.')[0],
      updated: issue.fields.updated.split('.')[0],
      storypoint: issue.fields.customfield_10001 || '',
      assignee: issue.fields.assignee?.displayName || '',
      issueType: issue.fields.issuetype.name || '',
      statusChanges: issue.changelog.histories,
    }
  }).map(row => {
    const minutes = (row.timespent || row.timeestimate || NaN) / 60;
    const hours = (minutes / 60).toFixed(2)

    return {
      ...row,
      url: `https://${process.env.ATLASSIAN_DOMAIN}/browse/${row.key}`,
      minutes,
      hours,
    }
  })

  if (data.startAt + data.maxResults < data.total) {
    return [...issues, ...(await fetchIssues(data.startAt + data.maxResults))]
  }

  return issues
}

const main = async() => {
  const issues = await fetchIssues(0);

  fs.writeFileSync('./issues.json', JSON.stringify(issues, null, 2), 'utf8');
}

main()
```

`projectName`は該当プロジェクトページで確認して指定する

## 環境変数

リクエストに必要な環境変数

- ATLASSIAN_DOMAIN

利用中のATLASSIANドメイン

- CONFLUENCE_API_TOKEN

Personal Access Tokenの値

- EMAIL

Personal Access Tokenを発行したユーザーのEmail


## リクエストパラメータ

基本的にドキュメント読めばよいが今回のコードのメモと所感を残しておく

### jql

JIRAのQueryLanguage

SQLライクにクエリを書ける

今回はProject名もしくはキーとステータス、更新日時を指定した

### expand

Issueに紐づくデータで取得したいものを指定する、指定がない場合はレスポンスに含まれない

今回だと`changelog`を取得している（Issueの変更履歴、いつどのカラムがどう変わったかなど）

RESTなのにGraphQL的な使い方だなと感じるが気は効いている

この機能がなかったら結局Issue毎にchangelogのエンドポイントへリクエストすることになるので…

### startAt

データのオフセットを指定できるため、一度のリクエストで取得した件数分上乗せして再帰的に特定範囲のデータを取得する

## おわり

いろいろ雑な部分はあるが最低限こんな感じでデータは取れるようになる

生データは未加工でどこかにおいたほうがよいのでは？ という話もあるが、単発で雑にまずデータ取ってみて分析とかするならまずはここからという感じ

サンプルなので一部のデータしか載せていないが実際にはレスポンスの中身をみて利用するデータを選定して整形処理なども含める

自分のケースだとステータスの移動のリードタイムを算出したりした

`fields.customfield_xxxxx`というようなカラムはJIRAで設定できるフィールドのようなのでこれも実際のレスポンス見て必要か判断する