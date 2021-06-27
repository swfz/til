---
title: "iframe以下のコンテンツをquerySelectorで取得する"
date: "2021-06-27"
description: "contentWindow"
tags:
  - JavaScript
---

知らずに結構時間を浪費したので残しておく

```javascript
const element = document.querySelector('.iframe').contentWindow.document.querySelector('.viewer-content');
```

見た目に表示されているからといって直接`document.querySelector`で指定しても取得できない

上記のようにquerySelectorでiframeの要素を指定してから`contentWindow`でiframeの中のコンテンツを対象にしてあげる必要がある

それ移行はいつもの`querySelector`の要領で要素を取得できる