---
title: TypeScriptのOptionalChaining
date: "2020-08-13"
description: "?."
tags:
  - TypeScript
---

TypeScript3.7からOptional Chainingが使えるようになっていた

Rubyでいうボッチ演算子

`?.`を挟むことで`null`や`undefined`の可能性があっても毎度チェックせずともよしなにやってくれる

関数呼び出しも同様に書くことができ次のようなパターンで記述可能

- `hoge?.fuga`
- `hoge?.[0]`
- `hoge?.(args)`

ネストの深いJSONなどで存在チェックをする際に楽に書けるようになる

- 例

GAのAPIレスポンスの特定のレコードを取得する

```diff
-    if (response && response.data && response.data.reports && response.data.reports[0] && response.data.reports[0].data && response.data.reports[0].data.rows) {
+    if (response?.data?.reports?.[0]?.data?.rows) {
       return response.data.reports[0].data.rows;
     }
     else {
       return [];
     }
```

Null合体演算子と組み合わせると次のように書くことができ、さらにスッキリする

- 左辺がnullやundefinedの場合はから配列を返す

```typescript
return response?.data?.reports?.[0]?.data?.rows ?? [];
```

### 参考
[Optional chaining - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

