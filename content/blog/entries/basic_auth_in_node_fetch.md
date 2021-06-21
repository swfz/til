---
title: "node-fetchでBasicAuthする"
date: "2021-06-22"
description: "base64してHeaderに設定"
tags:
  - Node
  - BasicAuth
  - node-fetch
---

## auth用の文字列の生成

今どきは`new Buffer`ではないらしい

次のようなWarningが出力される

```
(node:22161) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

ということで下記のように認証用の文字列を生成する

```javascript
const buffer = Buffer.from(`username:token`);
const authString = buffer.toString('base64');
```

## リクエスト

```javascript
const request = async () => {
  const res = await fetch(`https://example.com`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${authString}`
    }
  });

  return await res.json();
}

(async () => {
  const json = request();
  console.log(json);
})();
```

headersの`Authorization`にユーザー名とTOKENやパスワードを`:`でつなげbase64した文字列を入れる

それだけ