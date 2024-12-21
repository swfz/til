---
title: "mswのモックをjestのテストでも使う"
date: "2022-08-19"
description: "開発時と同様"
tags:
  - Jest
  - msw
  - TypeScript
---

開発用に定義したmswの設定をJestでも使いたい案件

参考のまんまだけどめちゃくちゃ簡単だった

テスト用のファイルに下記のように書くだけ

- search.tsx

```tsx
import { handlers } from "../../mocks/handler"
describe("Search", () => {
  const user = userEvent.setup()
  const server = setupServer(...handlers)

  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    server.close()
  })

  it("検索UIのテスト", async () => {
    // mswでのモックレスポンスが適用される
    .....
    .....
    .....
    .....
  })
})
```

- handler.ts

```ts
import { rest } from "msw"
import { setupServer } from "msw/node"

export const handlers = [
  rest.post("https://example.com/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({})
    )
  }),
]
```

`setupServer`で事前定義した`handlers`を読ませ`beforeEach`で各テストの実行前にサーバ起動する

終わったら落とすようにしている

これだけでよい

とても楽

開発時とテスト時で同じ設定を使えるのもメンテナンス上とてもよい

外部へのリクエストが発生する機能はどんどん活用していくモチベーションが上がった

### 参考
- [Jest + @testing-library/react + mswのtips - Qiita](https://qiita.com/shibukawa/items/4d431ee4f98c80b682ec)
