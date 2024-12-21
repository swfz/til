---
title: "TypeScriptの組み込み型関数Recordの覚書"
date: "2020-12-22"
description: "Recordの使い場所"
tags:
  - TypeScript
---

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
よくあるパターンだとは思うけどいざ書いているとなかなか出てこないので残す時間を作って書いている
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

`type`や`interface`を定義せず変数定義時に型も定義する場合などよくやりがちなのが次のような書き方

```typescript
const summary: {[key:string]: string} = .....
```

を書き換えると次のように書き換えられる

```typescript
const summary: Record<string, string> = .....
```

集計ロジックの中の中間の変数などでよくやりがち

少し要素を追加してサンプルコードを書いてみる

- サンプルコード

```typescript
type Row = {
  name: string;
  value: number;
}
const rows: Row[] = [
  {name: 'foo', value: 1},
  {name: 'bar', value: 2},
  {name: 'baz', value: 3},
  {name: 'bar', value: 2},
];
const summary = rows.reduce<Record<string, Row>>((acc,current) => {
  const key = current.name;
  return {...acc, [key]: {...acc[key], value: (acc[key]?.value ?? 0) + current.value}}
}, {} );

console.log(summary); // { foo: { value: 1 }, bar: { value: 4 }, baz: { value: 3 } }
```

- reduceの型定義

```typescript
reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
```

`reduce<T>`というようにデフォルトだと`previousValue`と`currentValue`の型が一緒だが型引数に独自の型を与えてあげることで`initialValue`の型を定義できる


この辺の使い方など普段から使っていないと忘れてしまうので意識して使えるようにしたい

- 参考
[TypeScriptの組み込み型関数 Recordの使いどころ - Qiita](https://qiita.com/kei-nakoshi/items/6b1ed11741b90e71e1bd)