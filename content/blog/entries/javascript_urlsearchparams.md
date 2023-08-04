---
title: "URLSearchParamsで配列を扱いたい"
date: "2023-08-04"
description: "id=1&id=2というような文字列を作る方法"
tags:
  - JavaScript
  - URL
---

URLのパラメータで`id=1&id=2`みたいな文字列を作りたい

## URLSearchParamsのドキュメント

[URLSearchParams - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams)

`重複する検索パラメータ`の項で同じキーの値が複数ある場合、クエリ文字列からパースして値を取得する方法は載っていたがクエリ文字列を生成する方法は載っていなかった

普通に配列渡したらよしなにやってくれるかと思ったらそうはいかなかった

```javascript
> ids = [1,2,3]
> search = new URLSearchParams({ids})
URLSearchParams { 'ids' => '1,2,3' }
> search.toString()
'ids=1%2C2%2C3'
```

カンマ区切りにされてしまうのね

### 参考

[javascript - Passing array into URLSearchParams while consuming http call for get request - Stack Overflow](https://stackoverflow.com/questions/38797509/passing-array-into-urlsearchparams-while-consuming-http-call-for-get-request)

```javascript
> ids = [1,2,3]
> search = new URLSearchParams(ids.map(s => ['id', s]))
URLSearchParams { 'id' => '1', 'id' => '2', 'id' => '3' }
> search.toString()
'id=1&id=2&id=3'
```

これで良いらしい

他のパラメータも含める場合

```javascript
> ids = [1,2,3]
> search = new URLSearchParams(ids.map(s => ['id', s]).concat([['a', 'a']]))
URLSearchParams { 'id' => '1', 'id' => '2', 'id' => '3', 'a' => 'a' }
> search.toString()
'id=1&id=2&id=3&a=a'
```

勉強になりました
