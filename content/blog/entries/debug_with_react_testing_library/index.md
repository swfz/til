---
title: "ReactTestingLibraryでデバッグする"
date: "2022-08-10"
description: "debug, container, baseElement"
tags:
  - React
  - React Testing Library
---

React Testing LibraryでReactのコンポーネントのテストを書いていた

今どのような状況だっけ?

みたいなときにレンダリングされているHTMLを実際に見たい

そういうときにReact Testing Libraryの`debug`を使ってHTMLを表示する

普通に`import`で呼べばOKかなと思って調べてみたら`render`でいろいろ返ってくる中にも入っていたためそっちを使うようにしてみた

- サンプル

```tsx
import { render } from "@testing-library/react"

const {debug, baseElement, container, getByTestId, getAllByTestId, getByTitle, getByPlaceholderText } = render(
  <Hoge></Hoge>
)
```

型定義を見に行ったら`container`,`baseElement`,`debug`なども返却値に含まれていた

このあたりを活用すれば中身を見ることができそう

```tsx
import { render } from "@testing-library/react"

const {debug, baseElement, container, getByTestId, getAllByTestId, getByTitle, getByPlaceholderText } = render(
  <Hoge></Hoge>
)

debug(baseElement)
debug(container)
```

- baseElement

```tsx
<body>
  <div>
  .....

  </div>
</body>
```

`baseElement`は`body`で囲われている、このタグはデフォルトは`document.body`で`render`時に指定した場合は指定したタグになるらしい

- container

```tsx
<div>
  .....
</div>
```


## テスト対象の要素外へのイベント発行

要素外をクリックしたら非表示になるか


みたいなテストを今回は含めたかったので`baseElement`をクリックすることで実現できた

```tsx
import { render } from "@testing-library/react"

const {baseElement, getByTitle } = render(
  <Hoge></Hoge>
)

await user.click(baseElement)
// click後DOMが変わっているか確認する
```

で、この辺調べたら`render`で返ってくる値のドキュメントがあった

[API | Testing Library](https://testing-library.com/docs/react-testing-library/api/)

何か1つ単語が分かると芋づる式に把握することが増えていくがそれらを調べていくと結局ドキュメント読むのが一番だよねとうい結論にたどり着くなー

最初からドキュメントを読みましょう案件