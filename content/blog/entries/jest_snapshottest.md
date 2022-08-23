---
title: "Jestのスナップショットテスト"
date: "2022-08-22"
description: "方法2通り"
tags:
  - Testing Library
  - Jest
  - React
  - TypeScript
---

Jestのスナップショットテストの話

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
検索するといろいろ方法が出てくるが`react-test-renderer`を使って行う記事が多いように思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

Jestの公式ドキュメントにもそういう例が書いてあった

最初は素直に真似ていたがほかにも方法があるようだったのでメモを残しておく

## react-test-endererを使う方法

よく記事で出てくるパターン

`renderer`をimportして`renderer.create()`+`toJSON()`で生成した値を使用する

```tsx
import renderer from "react-test-renderer"

...
...
...

    const tree = renderer.create(<Archive data={data}></Archive>).toJSON()
    expect(tree).toMatchSnapshot()
```

## Snapshot Testのドキュメント

[Snapshot Testing · Jest](https://jestjs.io/docs/snapshot-testing)

ドキュメントを読んだ

次の箇所

[Snapshot Testing · Jest](https://jestjs.io/docs/snapshot-testing#does-snapshot-testing-only-work-with-react-components)

スナップショットテストの対象について

要はシリアライズされた値であれば何を渡してもOKっぽい

例としてUIテストがケースとして良いので使っているだけってことのよう

スナップショットテストとしては、変更によってスナップショットと差分が出たかどうかだけをチェックしているということ

なので

Testing Libraryの`getBy....`で取得できる要素を直接渡してもOK

Testing Libraryのrenderで返ってくる変数の`container`をそのまま使用してもOK

オブジェクトを渡してもOK

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
なるほど!これなら活用範囲はほかにもありそうだなという感想を持ったので覚えておこうと思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

## Testing Libraryのrenderの返却値で行う方法

本題に戻り、今回はReactのUIテストでクリックだったりイベントをいくつか発行させた後の状態をスナップショットテストしたかった

なのでTesting Libraryで使う値を使ってスナップショットテストを行った

- 例

```tsx
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

...
...
...

    const user = userEvent.setup()

...
...
...

    const {
      container,
      getByTestId,
      getAllByTestId,
    } = render(<Search></Search>)

    const searchInput = getByPlaceholderText("Search")
    user.type(searchInput, "Bi")

    expect(container).toMatchSnapshot()
```

例だと`container`をスナップショットテストに使用した

イベント発行後のDOMの内容に差分が出てないかをチェックしている