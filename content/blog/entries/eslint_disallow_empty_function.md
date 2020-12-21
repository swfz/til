---
title: "Disallow empty functions (no-empty-function)"
date: "2020-12-21"
description: "ESLintのルールの一つ"
tags:
  - Node
---

ESLintで怒られたときの対応


次のような形で何もしない関数をコールバックとして渡していて怒られた

```typescript
fs.writeFile('/tmp/hoge.txt', 'hoge', null, () => {})
```


```
Disallow empty functions (no-empty-function)
```

`()`でくくって対応する

```typescript
fs.writeFile('/tmp/hoge.txt', 'hoge', null, () => ({}))
```

出典どこだったか忘れてしまったのでメモ残しておく