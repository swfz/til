---
title: "thinでサーバ起動できなくなっていたのでSSL証明書を発行して対応した"
date: "2022-04-27"
description: "鍵を独自に作って対応"
tags:
  - Ruby
  - OpenSSL
---

ブックマークレットの開発時、ローカルのサーバにSSL接続する必要があったのでRubyのthinというサーバを使っていた

久しぶりに起動したらアクセス時のエラーで立ち上げたサーバにアクセスできなくなっていた

- エラー

```
SSL routines:SSL_CTX_use_certificate:ee key too small:../ssl/ssl_rsa.c:310:
thin start --ssl -R app.ru -p 3001 -D -V: ssl.cpp:203: SslContext_t::SslContext_t(bool, const string&, const string&, const string&, const string&, const string&, int): Assertion `e > 0'
failed.
zsh: abort      bundle exec thin start --ssl -R app.ru -p 3001 -D -V
```

この現象自体は鍵長短すぎる!と言っているよう

デフォルトで使う鍵が条件を満たしていないので条件を満たす鍵とその鍵をもとに自己証明書を作成してあげる必要がある

なので長さ2048で鍵を作って自前でやる

ローカルでの動作だしと詳しいオプションは調べていない…

あと留意点としては証明書を発行する段階で対話的にいろいろ入力するが`Common Name`の箇所を自ホスト名にする必要がある

- 例

```
$ openssl genrsa 2048 > localhost.key
$ openssl req -new -x509 -nodes -sha256 -days 365 -key localhost.key -out localhost.crt

Country Name (2 letter code) [AU]:
...
Common Name: localhost
...

$ thin start --ssl --ssl-disable-verify --ssl-key-file=localhost.key --ssl-cert-file=localhost.crt -R app.ru -p 3001 -D -V
```

生成した鍵と証明書をthinの起動時に指定して上げれば無事サーバが起動できブラウザから接続できるようになった
