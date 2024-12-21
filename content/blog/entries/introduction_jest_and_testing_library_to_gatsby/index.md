---
title: "Gatsbyのブログにjestとreact-testing-libraryを入れてテスト可能にする"
date: "2021-07-19"
description: "jsdom使う"
tags:
  - Jest
  - Gatsby
  - TestingLibrary
---

基本的には下記を見ながら進めることで問題なかった

[Unit Testing | Gatsby](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/)

[Testing React Components | Gatsby](https://www.gatsbyjs.com/docs/how-to/testing/testing-react-components/)

進めていたら途中で詰まった

- src/components/__tests__/header.ts

```typescript
import React from "react"
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>;

describe("Bio", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Title />);
    expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!");
  })
})
```

```
❯ yarn test
yarn run v1.22.10
$ jest --config ./jest.config.js
 FAIL  src/components/__tests__/header.ts
  ● Test suite failed to run

    SyntaxError: /home/user/til/src/components/__tests__/header.ts: Unexpected token, expected "," (7:25)

       6 |
    >  7 | const Title = () => (<h1 data-testid="hero-title">Gatsby is awesome!</h1>);
         |                          ^
       8 |
       9 | describe("Bio", () => {
```

タグの解釈がうまく行かない？

TypeScript関連のようだがよくわからんということでうだうだ調べていた

よく考えれば分かることだがTypeScriptなのにReactの記法が書いてあるのでそりゃそうなるよねって感じだった

拡張子を`ts` -> `tsx`にして次に進めた

```
 FAIL  src/components/__tests__/header.tsx
  Bio
    ✕ renders correctly (2 ms)

  ● Bio › renders correctly
                                                                                                                                                                                                    The error below may be caused by using the wrong test environment, see https://jestjs.io/docs/configuration#testenvironment-string.
    Consider using the "jsdom" test environment.
```

デフォルトのテスト環境が`node`

レンダリングなどをするテストの場合は`jsdom`環境に変更してあげる必要がある

変更はテストファイルの先頭にコメントを入れることで可能

[Jestの設定 · Jest](https://jestjs.io/ja/docs/configuration#testenvironment-string)

全体に適用する場合は `jest.config.js`に項目を追加する

- jest.config.js

```javascript
module.exports = {
  .....
  .....
  .....
  testEnvironment: 'jsdom',
}
```


```
$ yarn test
yarn run v1.22.10
$ jest --config ./jest.config.js
 PASS  src/components/__tests__/header.tsx
  Bio
    ✓ renders correctly (23 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.013 s, estimated 2 s
Ran all test suites.
Done in 2.31s.
```

これで動くところまで持っていけたのでテスト書くぞ
