---
title: "mswでzipレスポンスを返す"
date: "2024-01-23"
description: "HttpResponse.arrayBuffer"
tags:
  - msw
  - zip
---

mswでモックする対象として`zip`や動画などバイナリファイルも扱える

次の例はGitHub Actionsの各ジョブのログをあらかじめDLしておきそれを読み込みレスポンスとして返す処理

- handlerの例

```typescript
export const handlers = [
  http.get('https://api.github.com/repos/*/*/actions/runs/*/logs', () => {
    const buffer = fs.readFileSync(
      path.resolve(process.cwd(), './src/mocks/responses/failed_log.zip')
    )

    return HttpResponse.arrayBuffer(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip'
      }
    })
  })
]
```

公式の例では`mp4`をバイナリとして返している

基本的にはこの方法でバイナリファイルでもレスポンスをモックすることが可能

- 公式

[Responding with binary - Mock Service Worker](https://mswjs.io/docs/recipes/responding-with-binary/)
