---
title: "JavaScriptで配列の最後の要素を取得する"
date: "2022-07-07"
description: "ES2022ならat"
tags:
  - JavaScript
---

よくあるのは

```javascript
const list = [1,2,3,4,5];
const lastValue = list[list.length - 1];
```

だが、そもそも上記の例での`list`を定義せずよしなにしたいケースが発生した

- org/repoの文字列からリポジトリ名のみを抜き出すケース

```javascript
const path = 'hoge/fuga';
const repo = path.split('/').pop(); // fuga
```

ES2022を使えるなら`at`で良い

```javascript
const path = 'hoge/fuga';
const repo = path.split('/').at(-1); // fuga
```

参考

[javascript - Getting the last element of a split string array - Stack Overflow](https://stackoverflow.com/questions/651563/getting-the-last-element-of-a-split-string-array)