---
title: "Deno Web Cacheを使ってGitHub APIへのリクエストをキャッシュする"
date: "2024-12-23"
description: "Web Cache"
tags:
  - Deno
  - Cache
---

DenoのWeb Cache APIが使えるようになっていた

<!-- textlint-disable ja-technical-writing/sentence-length -->
待望っちゃ待望なのでどこかで使ってみたいなと思っていたがちょうど[GitHubのコントリビューションを過去数年分さかのぼって1つの画像にまとめるAPI](https://swfz.hatenablog.com/entry/2024/12/22/172826)の記事で紹介したような機能に使えそうということでやってみた
<!-- textlint-enable ja-technical-writing/sentence-length -->

## Web Cache API

[Introducing Web Cache API support on Deno Deploy](https://deno.com/blog/deploy-cache-api)

Denoから外部APIへのリクエストのキャッシュ例があったのでケースとしてはまんまこのパターン

## 対象機能

参照記事の実装の概要や仕様

- GitHub GraphQLのクエリで受けたユーザーのコントリビューションデータ（草のもととなるデータ）を取得
- レスポンスとして、`from`や`to`で指定した最大366日分（ほぼ1年分）のコントリビューションデータが返ってくる
- 複数年にわたりデータを取得する必要がある
    - 現在だと最大16年ほどなので最大16回ほどAPIへリクエストが発生する
    - 対象データはコントリビューションのデータなので過去データは基本的には変わらない（はず）
- コントリビューションデータへクエリする際のノード消費量は1
    - ratelimit的には5000/1時間の制限がある

## 経緯

過去データに対してのAPIリクエストはCacheを使いAPIリクエスト自体発生しないようにすることでパフォーマンスの改善を狙う

最初実装を考えたときに最初からキャッシュするか迷ったがノード消費量1だしアクセスが結構あったとしてもratelimitに引っかかる心配はほぼない

なのでいったんは都度リクエストで大丈夫と判断してリリースした

実際にリリースしたらratelimitに引っかかることはないが期間が長くなると遅いなっていうのが正直なところだった

Slackとかに貼った場合、一定時間が経過するとリクエストが飛ぶっぽいのでそのたびに時間が掛かる、その都度遅く感じるっていうのが普通にストレス

ということでさっそくWebキャッシュを導入する


## 実装

- contributions.ts

```diff
-const getContributions = async (user: string, from?: string, to?: string) => {
+const getContributions = async (useCache: boolean, user: string, from?: string, to?: string) => {
+  const cache = await caches.open("gh-api");
+
+  const cacheKey = `${API_URL}/${user}/${from}/${to}`;
+  const cached = await cache.match(cacheKey);
+  if (useCache && cached) return await cached.json();
+
   const token = Deno.env.get("GH_READ_USER_TOKEN");
   const query = `
     query($user:String! $from:DateTime $to:DateTime) {

.....
.....
.....

     body: JSON.stringify(json),
   });

-  return await res.json();
+  if (useCache && res.ok && from && to) {
+    await cache.put(cacheKey, res.clone());
+  }
+
+  return await res.json();
 };
```

cacheの使用箇所はこんな感じ

`cacheKey`はURL形式にする必要があった（http,httpsで始まる文字列）ため、APIのエンドポイントURL＋ユニークの単位を担保できるようパラメータをつなげた文字列にした

`useCache`でcacheを使うかのフラグを外から渡すようにした

これは、今年のコントリビューション数は時間の経過で変化する可能性が高く、cacheは使わず都度リクエストを送るため渡す側で判断してコントロールするようにした

## 結果

アクセスログとか取っていなく、レスポンス時間を実測していないのは非常に残念ではあるが、実際12年とか13年とかの期間を試してみたら明らかに差が出た

Cache導入前は普通に体感30秒くらいかな?は時間かかっていたが一度アクセスしたあとは1~3秒くらいで返ってくる（体感）
