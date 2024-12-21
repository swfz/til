---
title: "setTimeoutの型注釈とReactでの実装例"
date: "2022-08-01"
description: ""
tags:
  - TypeScript
  - React
---

よく考えずに実装するとこんな感じで怒られる

```
  Type 'Timeout' is not assignable to type '(prevState: number | undefined) => number | undefined'.
    Type 'Timeout' provides no match for the signature '(prevState: number | undefined): number | undefined'.
```

- 参考というか答え

[TypeScript - use correct version of setTimeout (node vs window) - Stack Overflow](https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window)

次のようにして解決する

```typescript
const timerId = useRef<ReturnType<typeof setTimeout>>();

if (timerId.current) {
  clearTimeout(timerId.current);
}

timerId.current = setTimeout(() => search(query), 1000);
```

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
`ReturnType<typeof ...>`はよく使えるパターンだと思うので覚えておく
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

ReactだとuseStateを使ってtimerIdを管理するかと思ったがuseStateだとうまく想定通りの挙動をしてくれなかったためuseRefで実装した

下記の実装を参考にした

[react-use/useTimeoutFn.ts at master · streamich/react-use](https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts)

場合によってはそのまま上記の`useTimeoutFn`を使うのもあり