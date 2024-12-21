---
title: "GASでよく使いそうなスニペット"
date: "2021-12-17"
description: "主にスプレッドシートのGASで使う用"
tags:
  - GoogleAppsScript
  - JavaScript
---

## 二次元配列のデータをそのままスプレッドシートに記入する

```javascript
cosnt data = [
  ['a','b','c'],
  ['a','b','c'],
  ['a','b','c']
];
targetSheet.getRange(`A2:C4`).setValues(data);
```

2次元配列のままデータを追記できる

結構便利

ただ追記するデータとレンジが一致していないといけないので空文字で埋めたりする必要がある

- エラー

```javascript
cosnt data = [
  ['a','b','c'],
  ['a','b','c'],
  ['a','b']
];
targetSheet.getRange(`A2:C4`).setValues(data);
```

3行目のデータが1つ足りない

- エラー

```javascript
cosnt data = [
  ['a','b','c'],
  ['a','b','c']
];
targetSheet.getRange(`A2:C4`).setValues(data);
```

3行目にデータがない

Formsによるアンケートなどを集計したりする場合、列数がそろっていないことが往々にしてある

そういう場合、データの行数、各行の最大カラム数を計算して足りない分を空文字で埋める必要がある

## リストから空文字を排除する

```javascript
array.filter(name => name !== '')
```

数が合わないな?とデバッグしてみると`空文字が入ってた`みたいなパターン

スプレッドシートで一度でも入力があるセルは空文字になったりするのでそういうデータを除外する

## 要素数分だけ繰り返し処理する

要素数などを動的に取得して反復処理させたい場合など

直近だとスプレッドシートのリストからFormの項目を生成するみたいなときに使った

```javascript
  const pageSize = 10;
  [...Array(pageSize)].map((_,i) => i + 1).forEach(n => {
    // 何かしら
  });
```

## 範囲データの中で最大列数を取得する

```javascript
sheet.getDataRange().getValues().reduce((acc, cur) => cur.filter(name => name !== '').length > acc ? cur.filter(name => name !== '').length : acc, 0);
```

列数が動的な場合に最大値を取得してそれをカバーできるようにデータを整形するときに使う

## 対象データ範囲の中からユニークなリストを取得する

スプレッドシートのデータをRangeで取得すると2次元配列になっている

flatにしてSet型でユニークな値のリストを取得する

```javascript
[...new Set(sheet.getDataRange().getValues().flat().filter(name => name !== ''))];
```

