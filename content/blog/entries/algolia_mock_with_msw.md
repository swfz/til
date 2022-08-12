---
title: "Algoliaのレスポンスをmswでモックして開発ではダミーレスポンスを扱う"
date: "2022-08-12"
description: "実際のJSONを用意する"
tags:
  - Algolia
  - msw
  - TypeScript
---

Algoliaの検索リクエストをmswでモックした

開発時は検索用のAPIキーを登録せずにインデックスへのアクセスもしないようにすれば良くない？

空レスポンスを返すようにしておけば良くない？

みたいな話はあるものの、検索にかかるUI部分を開発するならある程度実際にリクエストした時のレスポンスが欲しくなる

かと言ってAlgoliaに毎度リクエストさせてしまうと無料枠がどんどん減っていく…

ということで、mswで解決した

## やっていること
- 実際のレスポンスデータをdev toolsのNetworkからレスポンス内容を取得してきてJSONに保存
    - 特定文字列(`BigQuery`)を順次入力した場合のレスポンスを逐次取得
        - `B`と入力した際のレスポンス
        - `Bi`と入力した際のレスポンス
        - `Big`と入力した際のレスポンス
        - `BigQ`と入力した際のレスポンス
        - `BigQu`と入力した際のレスポンス
        - `BigQue`と入力した際のレスポンス
        - `BigQuer`と入力した際のレスポンス
        - `BigQuery`と入力した際のレスポンス
- 先工程で保存したJSONをmswを用いて返すように設定する

「検索文字列の変化によっって返ってくる件数や内容が変わる」というのを再現したかったので固定値ではあるが検索文字列が変化した場合は文字数にあったレスポンスがmsw経由で返るようにした

実際のコードは下記

- handler.ts

```typescript
import { rest } from "msw"
import query0Words from "./algolia-search-response-0-words.json"
import query1Words from "./algolia-search-response-1-words.json"
import query2Words from "./algolia-search-response-2-words.json"
import query3Words from "./algolia-search-response-3-words.json"
import query4Words from "./algolia-search-response-4-words.json"
import query5Words from "./algolia-search-response-5-words.json"
import query6Words from "./algolia-search-response-6-words.json"
import query7Words from "./algolia-search-response-7-words.json"
import query8Words from "./algolia-search-response-8-words.json"

export const handlers = [
  rest.post("https://*.algolia.net/1/indexes/*/queries", (req, res, ctx) => {
    const empty = query0Words

    const wordCountResponseMap = [
      empty,       // 空
      query1Words, // B
      query2Words, // Bi
      query3Words, // Big
      query4Words, // BigQ
      query5Words, // BigQu
      query6Words, // BigQue
      query7Words, // BigQuer
      query8Words, // BigQuery
    ]

    const bodyString = req.body as string

    if (bodyString.length === 0) {
      return res(ctx.status(200), ctx.json(empty))
    }

    const body = JSON.parse(bodyString)
    const params = [
      ...new URLSearchParams(body.requests[0].params).entries(),
    ].reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {} as { query: string })

    if (
      !params.query ||
      params.query.length === 0 ||
      params.query.length > wordCountResponseMap.length
    ) {
      return res(ctx.status(200), ctx.json(empty))
    }

    return res(
      ctx.status(200),
      ctx.json(wordCountResponseMap[params.query.length])
    )
  }),
]
```

`import`している実際のレスポンスを保存したJSONはAlgoliaでの設定などにより変わるのでここでは割愛する

Algoliaのレスポンスを完全再現はできないので次のような挙動にしている

<!-- textlint-disable prh -->
- どの文字列を入力したとしても開発時は`BigQuery`と入力した場合のレスポンスを返す
- 検索文字列の入力文字数によってモック用のレスポンスを返す
    - 1文字入力時は`B`が入力された時のモック用レスポンスを返す
    - 2文字入力時は`Bi`が入力された時のモック用レスポンスを返す
    - 3文字入力時は`Big`が入力された時のモック用レスポンスを返す
    - 8文字まで同様
- 検索文字列が用意している文字列以上入力された場合は何も文字を入力していない場合のレスポンスを返す(`query0Words`)
<!-- textlint-enable prh -->

これで検索UIの開発はかなり捗ったのでメモとして残しておく
