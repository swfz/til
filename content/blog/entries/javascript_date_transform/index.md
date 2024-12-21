---
title: "JavaScriptで時刻と文字列の変換を行う"
date: "2022-06-17"
description: "Date"
tags:
  - JavaScript
---

zxを使っていて、ライブラリを使わずよしなにしたかった

```javascript
const unixtime = Date.parse("2022-06-15T00:00:00");
console.log(unixtime);
const d = new Date();
d.setTime(unixtime);
const str = d.toISOString();
console.log(str);
```

```shell
1655218800000
2022-06-14T15:00:00.000Z
```

変数`d`には一度宣言する必要があった

`Date.parse`の戻り値は数値（1970年1月1日の深夜0時から経過したミリ秒を表す数値）

実行環境によるようでJSTでparseしてくれるよう

`toISOString()`ではUTC時刻が表示される

数値に変換してから時間計算して戻すとかそういう使い方をしたいときに参照する