---
title: "TypeScriptでvaluesのUnionを取り出す"
date: "2022-11-21"
description: ""
tags:
  - TypeScript
---

`keyof`で値の方を取り出す

与えられたオブジェクトのvalueのUnion型を作る

```typescript
type ValueOf<T> = T[keyof T];

const test = {
  hoge: 'test',
  fuga: 'test2'
} as const;

type TestValues = ValueOf<typeof test> // 'test' | 'test2'
```
