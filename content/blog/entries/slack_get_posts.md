---
title: "Slack APIで特定チャンネルの会話履歴を取得する"
date: "2023-07-12"
description: "Bot作成してconversation.history"
tags:
  - Slack
  - JavaScript
  - dayjs
---

やったのでメモ

ただただ投稿された内容をAPIで取得するだけ

## トークンの取得

[Slack | Bolt for JavaScript](https://slack.dev/bolt-js/ja-jp/tutorial/getting-started)

Boltを使うわけじゃないが、Botトークンとユーザートークンの違いなど、あとはチュートリアルも含め日本語で解説があるので参考になる

Botアクセストークンを使うのが通常っぽい



## 必要権限

- `channels.read`
- `channels.history`
- `groups:history`

の権限を入れた

`Features > OAuth & Permissions`の画面で権限を追加する

## テスター

ドキュメントとサンプルコードとテスターがついているページ、これよい

https://api.slack.com/methods/conversations.history

tokenは`xoxb-xxxxxx`ってやつをつかう、Botトークン

ChannelIDとトークンを入れて実行し、レスポンスが返ってくれば疎通はOK

Botユーザーを対象チャンネルに招待しないと見えないので招待はしておく

招待していない状態で叩いても404になる

`@bot名`でメンションつけて「いないけど招待する？」って聞かれるので招待した

## サンプルコード

サンプルコードを使って実際にCLIから取得してみる

```
yarn add @slack/web-api
```

サンプルコードだけだと動かせなかったのでいくつか修正して次のような感じで実行できるようにした

- get-posts.js

```javascript
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
import { WebClient, LogLevel } from '@slack/web-api'
import dayjs from 'dayjs';

const token = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;
const targetDate = process.argv[2] || dayjs().format('YYYY-MM-DD');

const client = new WebClient(token, {
  // LogLevel can be imported and used to make debugging simpler
  // logLevel: LogLevel.DEBUG
});

const transformer = (message) => {
  const {text, ts} = message;
  const time = dayjs.unix(ts).format('HH:mm');

  return `${time} ${text}`;
}


(async() => {
  const result = await client.conversations.history({
    channel: channelId
  });

  const conversationHistory = result.messages;

  const groupByDate = conversationHistory.reduce((acc, message) => {
    const date = dayjs.unix(message.ts).format('YYYY-MM-DD');

    acc[date] = acc[date] || [];

    return {...acc, [date]: [...acc[date], message]};
  }, {});

  const list = groupByDate[targetDate].map(transformer).reverse();
  console.log(list);
})();
```

特定日付のポストを表示できるようにした、用途的にこれで十分だったのでスレッドとかは考慮してない

```
node get-posts.js 2023-07-17
[
  '05:37 寝てしまった、、、',
  '09:07 クーラーつけてお布団かぶって寝るの最高',
  '16:46 水遊び'
]
```

### dayjsでunixtimeを変換する

レスポンスに入っている`ts`はUNIXタイムスタンプ

dayjsで読み込む

```javascript
const ts = '1688893846.297589';
const time = dayjs.unix(ts);

const timeStr = time.format('YYYY-MM-DD HH:mm:ss');
```

```
2023-07-09 18:10:46
```


## 他参考

[Slack APIでチャンネルのメッセージを取り出してみる - Qiita](https://qiita.com/sampo-cure/items/6b57d8503e37a0d2d1f6)