---
title: Null合体演算子
date: "2020-08-14"
description: "??"
tags:
  - JavaScript
---

## Null合体演算子

しらなかったのでメモ

よくあるデフォルト値を代入するときなどに使うやつ

## `||`との違い
### ||

左辺がfalsyな値なら右辺を返す

falsyな値とは`null`,`undefined`,`0`と空文字列など

### ??

左辺が`null`または`undefined`の場合に右の値を返す

0や空文字列の場合はそちらを返したい場合などに有効

## 実行例

### ??

```javascript
const value1 = null ?? 'default string';
console.log(value1);
// expected output: "default string"

const value2 = undefined ?? 'default string';
console.log(value2);
// expected output: "default string"

const value3 = "" ?? "default string";
console.log(value3);
// expected output: ""

const value4 = 0 ?? 42;
console.log(value4);
// expected output: 0

const value5 = [] ?? [1,2,3];
console.log(value5);
// expected output: []

const value6 = {} ?? "{a: 'b'}"
console.log(value6);
// expected output: {}
```

### ||

```javascript
const value1 = null || 'default string';
console.log(value1);
// expected output: "default string"

const value2 = undefined || 'default string';
console.log(value2);
// expected output: "default string"

const value3 = "" || "default string";
console.log(value3);
// expected output: "default string"

const value4 = 0 || 42;
console.log(value4);
// expected output: 42

const value5 = [] || [1,2,3];
console.log(value5);
// expected output: []

const value6 = {} || "{a: 'b'}"
console.log(value6);
// expected output: {}
```

### 参考
[Null合体演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
