---
title: "mswでSVGをモックする"
date: "2021-12-29"
description: "Pixelaを題材としてモックしてみた"
tags:
  - JavaScript
  - TypeScript
  - Gatsby
  - msw
---

本ブログでPixelaのグラフを表示させるようにした

表示するだけなら下記にあるようにiframeで呼び出すだけでOK

[草グラフを iframe タグで簡単に埋め込む（Pixela v1.12.1） - えいのうにっき](https://blog.a-know.me/entry/2019/06/16/210915)

が、Gatsbyなどで開発しているときなどは特にリクエストを外部に送る必要がないためURLを出し分けするなりモックするなどできたら良いなと思っていた

これができていればuseEffectでミスって無限ループしてしまったときなども特に心配せずに開発できる

mswを使えば外部リクエストをモックできるので行けそう?だったがiframeの中身のコンテンツのモックはできないようなのでSVGを表示する方法にする

ということでmswを使ってSVGをモックするようにしてみた

## install

[Install - Getting Started - Mock Service Worker Docs](https://mswjs.io/docs/getting-started/install)

基本的にはドキュメントを見て進めるでOKそう

```shell
yarn add --dev msw
mkdir src/mocks
touch src/mocks/handlers.ts
```

publicディレクトリに作成する

gatsbyなので`static/`

```
npx msw init static/ --save
```

すると`static/mockServiceWorker.js`というファイルが生成される


## svgファイルをモックする

必要な修正をする

- gatsby-browser.js

```javascript
const startWorker = async () => {
  const { worker } = require("./src/mocks/browser")
  await worker.start({
    ServiceWorker: {
      url: "/pixela-mock",
    },
  })
}

export const onClientEntry = () => {
  if (process.env.NODE_ENV === "development") {
    startWorker()
  }
}
```

Gatsbyのレンダリング初期にモック処理ができるか調べてみた

[Gatsbyドキュメント Doc -> Recipes ざっくりまとめ - 奇をてらったテクノロジー](https://kiotera-tech.com/gatsby_doc_recipes_summary)

[https://kiotera-tech.com/gatsby_doc_recipes_summary:embed:cite]

Gatsbyのライフサイクル`onClientEntry`を使うことで可能っぽい

`onClientEntry`の処理時に`startWorker`を動かすようにした

このライフサイクルを考慮せず`startWorker`を書いてしまうとタイミングによってはモックされたりされなかったり…という現象に見舞われた

- src/mocks/browser.js

```javascript
// src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from './handler'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
```

- src/mocks/handler.ts

```typescript
import { rest } from 'msw'
import svgImage from './pixela.svg'

export const handlers = [
  rest.get('https://pixe.la/v1/users/swfz/graphs/til-pageviews', async (req, res, ctx) => {
    const svgBuffer = await fetch(svgImage).then((res) => res.arrayBuffer())

    return res(ctx.status(200), ctx.body(svgBuffer))
  }),
  rest.post('https://undefined-1.algolianet.com/1/indexes/*/queries', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({results: {hits: []}}))
  })
]
```

svgファイルは一度curlなり何なりでローカルに持ってきて保存しておく→`./pixela.svg`

おまけでalgoliaへのリクエストも開発時はほとんど使わないので定義した

## SVGのモック処理

svgをモックするのどうすれば良いのかと思ったが

画像と同じような感じでOKだったので`arrayBuffer`を使う

[Possible to mock an img src url? · Issue #461 · mswjs/msw](https://github.com/mswjs/msw/issues/461)

モックできているかどうかの確認はモック用のSVGはPixelaの色を変えてからローカルに保存したのでdev用は赤、本番は青といった感じで別れている

## まとめ

mswを使って開発時はpixelaへのSVGリクエストをモックして開発時はアクセスが行かないようにした

リクエスト先のURLを出し分けせずにモックできるのは非常に体験が良い

外部のサービスやツールを使っていてsandbox用とかで分けられていない場合などいろんな用途に使えそう

他にも用途いろいろありそうなので使っていこうと思った