---
title: "NetlifyからCloudflare Pagesに移行する"
date: "2022-05-30"
description: "Custom Domainだけちょっと作業あった"
tags:
  - Netlify
  - Cloudflare
  - Cloudflare Pages
---

Netlifyでビルド時間の制限で$7/月掛かることが増えてきてしまったのでCloudflarePagesに乗り換えた

親切なことに移行方法がドキュメントにまとめられている

[Migrating from Netlify to Pages · Cloudflare Pages docs](https://developers.cloudflare.com/pages/migrations/migrating-from-netlify/)

ビルドからデプロイまでは上記にしたがってやれば特に問題なくデプロイまではできるはず

## カスタムドメイン

自分はAWSのRoute53でtilのドメインを管理している

なのでAWS側でCNAMEのレコードを変更することで対応する

### Cloudflare側
- Pages→CustomDomainsのタブ
- サブドメイン込みで入力
- CluodFlareのDNSか独自のDNSどっち使うの？ と聞かれるのでMyDNSProviderを選択
    - 管理はAWSのRoute53で行っているので

### AWS側
- AWS側のAレコードを削除（Netlifyの設定では必要だったらしい）
- CNAMEをNetlifyからCloudflareのものに変更
    - `${適当な文字列}.pages.dev`←のような値


しばらくすると検証が終わりカスタムドメインでアクセスできるようになる

```
$ nslookup til.swfz.io
Server:         172.27.112.1
Address:        172.27.112.1#53

Non-authoritative answer:
til.swfz.io     canonical name = til-5tb.pages.dev.
Name:   til-5tb.pages.dev
Address: 172.66.44.99
Name:   til-5tb.pages.dev
Address: 172.66.47.157
Name:   til-5tb.pages.dev
Address: 2606:4700:310c::ac42:2c63
Name:   til-5tb.pages.dev
Address: 2606:4700:310c::ac42:2f9d
```

CNAMEが変わっていることを確認

### 参考

[ブログをCloudflare Pagesに引っ越し](https://zenn.dev/aumy/scraps/a49b6cab86bb08)
