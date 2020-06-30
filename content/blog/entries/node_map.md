---
title: ES2015のMap,Setで重複カット
date: "2020-06-29"
description: "Map Setを使うことで重複カット的なことが簡単に行える"
tags:
  - ES2015
  - JavaScript
---

Set,Mapを使うことで今までごにょごにょしてた部分がスッキリ書けるようになる

## Set

```javascript
const allNames = ['a','b','c','c','d','b','a'];
const names = [...new Set(allNames)];
// ['a','b','c','d']
```

## Map

```javascript
const uniq = new Map();
const users = [
  {id: 'aaa', name: 'hoge'},
  {id: 'aaa', name: 'hoge'},
  {id: 'bbb', name: 'fuga'},
]

for (let u of users) {
  uniq.set(u['id'], u)
}

console.log(uniq.values());
//  { id: 'aaa', name: 'hoge' },
//  { id: 'bbb', name: 'fuga' },

console.log(uniq.entries());
// [Map Entries] {
//   [ 'aaa', { id: 'aaa', name: 'hoge' } ],
//   [ 'bbb', { id: 'bbb', name: 'fuga' } ]
// }

console.log(uniq.size); // 2
```

あまり観測範囲で使っているの見ないが便利なので使っていきたい

