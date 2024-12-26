---
title: "MutationObserverで対象要素がコールバック実行時に存在するかのチェック"
date: "2024-12-16"
description: "isConnected"
tags:
  - HTML
  - JavaScript
---

特定のDOMの変更を監視して変更があったらあらかじめセットしたコールバックを実行させることができるMutationObserverという便利なAPIがある

[MutationObserver - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver)

かなり便利なんだけど、昨今のインタラクティブにレイアウトがいろいろ変わるUIだと、一度監視を開始したはずがいつの間にか対象のDOMが削除されてしまってたみたいなことがよくある

監視が効いているかチェックできれば良いなと調べたらやはりあった

## isConnected

[Node: isConnected プロパティ - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Node/isConnected)

Node.isConnected

対象ノードがドキュメントツリーに接続されているかを判定するための真偽値

ドキュメント内に対象が存在しているか確認する際に使われるもの

これを活用すると一度Observeした要素が何かしらの理由で削除された場合に検知が可能

- サンプルコード

```typescript
const observeElement = document.querySelector('.hoge')

const observer = new MutationObserver(async function (
  records: MutationRecord[]
) {
  if (observeElement.isConnected) {
    // Document内に存在している場合の処理
    // 変更を検知して行う処理
  } else {
    // 何らかの理由でDocument内に存在しない状態
    // エラーハンドリングなり再度Observeするなりの処理
  }
})

observer.observe(observeElement, { subtree: true, childList: true })
```

`isConnected`は対象Nodeがドキュメント内に存在する間は`true`が返ってくるので対象要素以下のDOMの変更を検知して何かしらの処理をする

DOMに変更があり監視対象のNodeが削除された場合、その変更もObserve対象に入るのでその段階で`else`に通り何かしらのハンドリングを行える
