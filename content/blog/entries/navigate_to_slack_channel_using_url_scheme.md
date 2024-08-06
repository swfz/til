---
title: "URL SchemeでSlackの特定チャンネルへ遷移する"
date: "2024-08-06"
description: "URL Scheme"
tags:
  - Slack
---

PCからだとそんなに旨味はないが、モバイルにおいてはショートカットと組み合わせたりすれば活用の幅が広がると思っている

よくつぶやき的に使う何でもポストチャンネルへの遷移をURL Schemeで行う

## 公式

[Reference: Deep linking into Slack | Slack](https://api.slack.com/reference/deep-linking)

公式にもちゃんと書いてある

```
slack://channel?team={TEAM_ID}&id={CHANNEL_ID}
```

`team`,`id`のパラメータが必要

### team IDを取得する

[Slack URL または ID を確認する | Slack](https://slack.com/intl/ja-jp/help/articles/221769328-Slack-URL-%E3%81%BE%E3%81%9F%E3%81%AF-ID-%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)

ブラウザで特定のURLを開いて`T`から始まる部分がteamのID
    
### channel idを取得する

チャンネル設定からチャンネル情報を閲覧すると下の方にコピー項目があるのでコピーする

これで作成したURLを開くと特定のチャンネルへ遷移させられる
