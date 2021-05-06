---
title: "PocketのデータをAPI経由でBigQueryに取り込む"
date: "2021-05-07"
description: "ACCESS KEYの発行とRetrieveエンドポイントを叩くまで、おまけでBigQueryにいれてみた"
tags:
  - Pocket
  - BigQuery
  - GoogleCloudPlatform
  - jq
---

まず`My Applications`から`CREATE APP`でアプリケーションを作成して`consumer key`を取得する

取得した`consumer key`を環境変数に入れておく

```shell
$ export CONSUMER_KEY=xxxxx
```

## request tokenの発行

適当なリダイレクト先を指定してrequest tokenを生成する

```shell
$ curl -H "Content-Type: application/json; charset=UTF-8" -X POST \
   https://getpocket.com/v3/oauth/request \
   -d @-<<EOS
{
  "consumer_key" : "${CONSUMER_KEY}",
  "redirect_uri":"http://localhost:8001/"
}
EOS
code=xxxxx
```

結果を環境変数に入れておく

```shell
$ export REQUEST_TOKEN=xxxxx
```

## ブラウザへ遷移してアプリケーションのアクセス許可を行う

リダイレクト先は適当に

```shell
open "https://getpocket.com/auth/authorize?request_token=${REQUEST_TOKEN}&redirect_uri=http://localhost:8001/"
```

## access tokenの発行

先の手順で得たrequest tokenを用いてaccess tokenの発行する

```shell
$ curl -H "Content-Type: application/json; charset=UTF-8" -X POST \
https://getpocket.com/v3/oauth/authorize \
-d @-<<EOS
{
  "consumer_key":"${CONSUMER_KEY}",
  "code":"${REQUEST_TOKEN}"
}
EOS
access_token=xxxxx&username=hoge
```

`access_token=`の部分を環境変数に入れておく

```shell
$ export ACCESS_TOKEN=xxxxx
```

これで準備が完了した

## 何かしら問い合わせてみる

記事データを取得してみる

```shell
curl -o res.json -H "Content-Type: application/json; charset=UTF-8" -X POST \
https://getpocket.com/v3/get -d @-<<EOS
{
  "consumer_key":"${CONSUMER_KEY}",
  "access_token":"${ACCESS_TOKEN}",
  "state":"unread",
  "detailType":"complete",
  "count":3
}
EOS
```

[Pocket API: Retrieving a User's Pocket Data](https://getpocket.com/developer/docs/v3/retrieve)

retrieveのAPIの仕様についてはこの辺

## おまけ

ここで得たJSONをBigQueryに放り込んでよしなにやろうとしたが一筋縄では行かなかった

次のエラーはレスポンスのJSONファイルをそのままGCSにあげて`bq load`しようとした結果

```
Error in query string: Error processing job 'project-111111:bqjob_r75b06933ac2f4481_0000017942c36b05_1': Invalid field name "3292257344". Fields must contain only letters, numbers, and
underscores, start with a letter or underscore, and be at most 300 characters long. Table: sample_8bb5a901_3d95_41f4_9512_e7f4fad8a737_source
```

エラー文言自体は`文字またはアンダースコアで始まり`の部分に違反しているのでエラーがでているがそもそもこのキーがIDなので記事によって可変であるためスキーマ定義ができない

json形式が微妙すぎるのでどうしてもフォーマットしてあげないとダメそう

```json
{
  "status": 1,
  "complete": 0,
  "list": {
    "3324677936": {
      "item_id": "3324677936",
      "resolved_id": "3324677936",
      .....
    },
    "3324677937": {
      "item_id": "3324677937",
      "resolved_id": "3324677937",
      .....
    },
    .....
```

こんな感じで数値キーのハッシュとして出力されている

配列で表現してほしかった…

ということで数値キーになっている要素を数値キーを削除した形で保持させる

```json
{
  "status": 1,
  "complete": 0,
  "list": [
    {
      "item_id": "3324677936",
      "resolved_id": "3324677936",
      .....
    },
    {
      "item_id": "3324677937",
      "resolved_id": "3324677937",
      .....
    },
    .....
  ]
```

こんな感じ

中身を見た感じ`.list`以外にも同様の形式だったのでそちらも同様に配列に変更する必要がある

### ハッシュ→配列にする必要がある要素

執筆時点で把握しているのは下記

- .list
- .list.images
- .list.videos
- .list.authors

### jqでよしなにやる

```
cat res.json| jq  -cr '.list=(.list|to_entries|map(.value)|map(.images=if has("images") then .images|to_entries|map(.value) else [] end)|map(.videos=if has("videos") then .videos|to_entries|map(.value) else [] end)|map(.authors=if has("authors") then .authors|to_entries|map(.value) else [] end))' > list.json
```

キー自体がそもそもない場合もあったのでその場合は空配列にする

### BigQueryに入れ込む

```
bq load --replace --autodetect --source_format=NEWLINE_DELIMITED_JSON sample_dataset.sample list.json
```

これでOK