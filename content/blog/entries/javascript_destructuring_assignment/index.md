---
title: "JavaScriptの分割代入"
date: "2021-08-12"
description: "メモ"
tags:
  - JavaScript
---

[分割代入 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## 連想配列

できるのは知ってたけどGatsbyのチュートリアル動画を見てたら下記のような代入をしていてなるほどとなったのでメモ

```javascript
> const response = {code: 200, body: {name: 'hoge', id: 1}}
undefined
> response
{ code: 200, body: { name: 'hoge', id: 1 } }
> const { name } = response.body
undefined
> name
'hoge'

// 下記と同様
> const name2 = response.body.name
undefined
> name2
'hoge'
```

例のパターンだとどちらでも良いといえば良いが多少スッキリする

また、複数代入したいみたいなときは有効かなと感じる

```javascript
> const {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
undefined
> a
10
> b
20
> rest
{ c: 30, d: 40 }
```

`...rest`で残りの連想配列も代入できるのが地味に良い

## 配列

```javascript
> const [a, b, ...rest] = [10, 20, 30, 40, 50];
undefined
> a
10
> b
20
> rest
[ 30, 40, 50 ]
```

こちらも`...rest`で残りの要素を代入できる

直近だとGoogleFormsの解答結果を集計する際に相性が良かった

スプレッドシートのデータ扱う場合は基本的に2次元配列であることと、A列のデータは○、B列のデータは△みたいに固定になっていることが多いのでそれを分割代入で代入してよしなにやるパターンでサッと書ける

便利さを実感したので今後意識しておこうと思った
