---
title: "JSON.stringifyでundefinedな値は省かれる"
date: "2022-06-24"
description: "知らなかった"
tags:
  - JavaScript
---

zxでAPI叩いて整形して整えたJSONをGCSに上げてbq loadする

みたいなごく簡単な作業をしていたときに雑に`bq load --autodetect`を使っていたらカラムが合わないとエラーで怒られた

よく調べるとJSONの中身からあるはずのキーが抜けていた

REPLで確認

```
> const hoge = {a: undefined, b: 1, c: 3}
undefined
> hoge
{ a: undefined, b: 1, c: 3 }
> JSON.stringify(hoge)
'{"b":1,"c":3}'
```

知らなかった…

調べたらMDNにもしっかり書いてあった

[JSON.stringify() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

> undefined、 関数 (Function)、シンボル (Symbol) は有効な JSON 値ではありません。変換中にそのような値に遭遇した場合は、 (オブジェクトの中で発見された場合は) 省略されたり、 (配列の中で見つかった場合は) null に変換されたりします。 JSON.stringify は JSON.stringify(function(){}) や JSON.stringify(undefined) のように「純粋」な値を渡した場合に undefined を返すことがあります。

なのでzxやJavaScriptでJSONを生成する際はundefinedな値が入らないように整形処理を書くか次のようにreplacerで変換してあげるなどの方法がある

```
> hoge = {a: undefined, b: 1, c: 3}
{ a: undefined, b: 1, c: 3 }
> JSON.stringify(hoge, (k,v) => {
  return v === undefined ? null : v;
});
'{"a":null,"b":1,"c":3}'
```