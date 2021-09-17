---
title: "ConfluenceにAPI経由で投稿する"
date: "2021-09-18"
description: "HTMLベースなのでツラミある"
tags:
  - Confluence
---

## 下準備

アカウント管理ページでAPIトークンを作成する

[api-tokens](https://id.atlassian.com/manage/api-tokens)


## APIをたたく

参考にするのはこの辺

[The Confluence Cloud REST API](https://developer.atlassian.com/cloud/confluence/rest/api-group-content/#api-api-content-post)

- 基本系

```shell
curl -X GET "https://${ATLASSIAN_DOMAIN}/wiki/rest/api/content" \
  -u "${EMAIL}:${CONFLUENCE_API_TOKEN}" \
  -H 'Accept: application/json'
```

上記をもとにブログポストを生成するスクリプトを用意した

`CONFLUENCE_API_TOKEN`,`ATLASSIAN_DOMAIN`,`EMAIL`は環境変数に適切な値を入れておく

`CONFLUENCE_API_TOKEN`は下準備で生成したAPIトークン

最低限だとこんな感じで投稿できるはず

- blogpost.sh

```shell
title="From API Test"
space_key="~username"
body_value="hoge"

curl -X POST "https://${ATLASSIAN_DOMAIN}/wiki/rest/api/content" \
  -u "${EMAIL}:${CONFLUENCE_API_TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d @- <<EOS
{
  "title": "${title}",
  "type": "blogpost",
  "space": {
    "key": "${space_key}"
  },
  "status": "current",
  "body": {
    "storage": {
      "value": "${body_value}",
      "representation": "storage"
    }
  }
}
EOS
```

### 試行錯誤

最初`body.storage`の部分を`body.view`にしていたら投稿はできるがコンテンツが空の状態になってしまっていた

ライブラリはどうやってんだと思い次のソースをよんだ

[confluence-api/confluence.js at master · johnpduane/confluence-api](https://github.com/johnpduane/confluence-api/blob/master/lib/confluence.js)

[https://github.com/johnpduane/confluence-api/blob/master/lib/confluence.js:embed:cite]

```diff
{
  "title": "${title}",
  "type": "blogpost",
  "space": {
    "key": "${space_key}"
  },
  "status": "current",
  "body": {
-    "view": {
+    "storage": {
      "value": "${body_value}",
-      "representation": "view"
+      "representation": "storage"
    }
  }
}
```

こんな感じの差分で投稿できるようになった

representationが何を意味するのかまでちゃんと読んでないが無事コンテンツの中身も反映されるようになった

APIでのやりとりではHTMLをそのまま投げるという感じ

markdown2confluenceなど使えばMarkdownで書いた文書をコンフルに同期とかできるかと思ったけどそもそも記法が違うので今回は使わなかった

## 更新を伴う投稿

新規投稿ならPOSTだけでOKだが更新処理を含める場合はversion番号が必要なため複数APIをたたかないといけない

jsonで定義した値をフォーマットして定期的に更新するスクリプトを書いた

- scrap.json

```json
[
  "リプレイスとかバージョンアップとかの記事",
  "https://blog.cybozu.io/entry/2021/06/16/080000",
  "https://developers.cyberagent.co.jp/blog/archives/30257/",
  "https://buildersbox.corp-sansan.com/entry/2021/06/24/110000",
  "comment: リプレイスとかやりました！その後の話は結構ありかも",
  "エンジニアブログ系",
  "https://tech.classi.jp/entry/2021/06/18/120000",
  "comment: こんな感じで運営してますってのは運営の価値観が垣間見れてよい、他のも見てみたい感ある",
  "https://tech.pepabo.com/2021/07/14/pepabo-tech-blog-2021/",
  "comment: ブログの執筆ふろーの自動化周りの話と思想、おもしろい"
]
```

- scrap.js

```javascript
const fetch = require('node-fetch');
const fs = require('fs');

const pageId = 1111111111;

const formatTitle = (value) => {
  return `<p><h2>${value}</h2></p>`;
}

const formatLink = (url) => {
  return `<p><a href=\"${url}\" data-card-appearance=\"inline\">${url}</a></p>`;
}

const formatComment = (value) => {
  return `<p>${value}</p>`;
}

const generateBody = () => {
  const scraps = JSON.parse(fs.readFileSync('./scrap.json'));
  console.log(scraps)

  return scraps.map((line)=> {
    if (line.match('http')) {
      return formatLink(line)
    }
    if (line.match('comment:')) {
      return formatComment(line)
    }

    return formatTitle(line);
  }).join("\n");
}

const authString = () => {
  const username = process.env.EMAIL;
  const token = process.env.CONFLUENCE_API_TOKEN;
  const buffer = Buffer.from(`${username}:${token}`);

  return buffer.toString('base64');
}

const putText = async (authString, pageId, versionNumber) => {
  const title = '記事スクラップ'
  const spaceKey = '~username';
  const type = 'page';

  const bodyData = {
    "version": {
      "number": versionNumber
    },
    "title": title,
    "type": type,
    "id": pageId,
    "space": {
      "key": spaceKey
    },
    "status": "current",
    "body": {
      "storage": {
        "value": generateBody(),
        "representation": "storage"
      },
    }
  };

  const res = await fetch(`https://${process.env.ATLASSIAN_DOMAIN}/wiki/rest/api/content/${pageId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`
    },
    body: JSON.stringify(bodyData)
  });

  return await res.json();
}

const getVersion = async (authString, pageId) => {
  const res = await fetch(`https://${process.env.ATLASSIAN_DOMAIN}/wiki/rest/api/content/${pageId}?expand=version`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${authString}`
    }
  });

  return await res.json();
}

(async () => {
  const versionResponse = await getVersion(authString(), pageId);
  const putResponse = await putText(authString(), pageId, versionResponse.version.number + 1);
  console.log(putResponse);
})
```

`spaceKey`,`pageId`は環境によって記述を変える必要がある

さっと書いたのでいろいろ考慮足りない部分もあるが投稿までのしくみはこんな感じでOKそう