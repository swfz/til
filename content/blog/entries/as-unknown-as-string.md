---
title: "TypeScript+JestでDateのモックをするときの型定義"
date: "2022-07-20"
description: "as unknown as string"
tags:
  - TypeScript
  - Jest
---

Jestでテストをする時の話、Dateをモックして特定の日付を返したいといったよくあるパターン

ちょうどGatsbyで作った本ブログのテストでも使用していて、エディタ上では赤くなっていたので対応しようと重い腰を上げた

- もともと書いていたコード

```typescript
beforeAll(() => {
  // 2021-03-10T15:00:00.000Z
  const mockDate = new Date(1615388400000)
  jest.spyOn(global, "Date").mockImplementation(() => mockDate)
})
```

- 型のエラー内容

```text
src/components/__tests__/archive.tsx:11:49 - error TS2345: Argument of type '() => Date' is not assignable to parameter of type '() => string'.
  Type 'Date' is not assignable to type 'string'.

11   jest.spyOn(global, "Date").mockImplementation(() => mockDate)
```

さっと調べるとでてくるstackoverflow、読んでみるとさまざまな解決方法があるよう

[unit testing - jest typescript - Mock Date constructor - Stack Overflow](https://stackoverflow.com/questions/60912023/jest-typescript-mock-date-constructor)


単純に`as string`でキャストしようとするとそう簡単には許してくれない

```text
src/components/__tests__/archive.tsx:13:31 - error TS2352: Conversion of type 'Date' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

13     .mockImplementation(() => mockDate as string)
```

このエラーにも書いてあるが「型が合いません、意図的なものならまず`unknown`にしてください」とのこと

結局下記のように書くことにした

```typescript
jest.spyOn(global, "Date").mockImplementation(() => (mockDate as unknown) as string)
```

こういう回避方法があるのね…

一度`unknown`にキャストしてさらに`string`にキャストすると

そもそもキャスト自体もあまり推奨されるやり方じゃないと思っていたが今回のケースではやむを得ず…

`// @ts-ignore`で握りつぶすよりかは良いか…という感じ

## 2022-11-06追記

"@types/jest": "29.2.2",からこのハックは必要なくなった

使い続けていると怒られる

```
Argument of type '() => string' is not assignable to parameter of type '(value: string | number | Date) => Date'.
```

Dateを直接渡せるようになったみたい
