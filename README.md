# TIL

[swfz.memo](https://til.swfz.io)

## development

```
pnpm dev
```

- with Cloudflare function d1

```
npx wrangler pages dev --d1=DB --proxy=8000 -- pnpm dev
```

- 初期

pages + functionだと`wrangler d1 --local`で作ったDBをバインドする方法がなさそう?（2023-10-24時点では見つけられなかったので次のように処理する）

一度`--d1=DB`というようにバインドして起動するとSQLiteのファイルが作成される

`.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${hogehoge}.sqlite`にバインド時使用するSQLiteファイルがある

特定してそこに`schema.sql`を流し込む

```
sqlite3 .wrangler/state/v3/d1/miniflare-D1DatabaseObject/hogefugapiyo.sqlite < schema.sql
```


### Algolia APIのモックデータ

開発では基本的にAlgoliaにリクエストが飛ばないようになっている

APIの内容が変わった場合は本番レスポンスを取得して各種JSONを更新する

### VRT

playwrightを使用している

記事の数によって変更が生じてしまうため一定過去のデータのみ（2023-11-01以前）GatsbyのNodeを取得するようにしている

そのためビルド時に環境変数の指定が必要

- スナップショットの更新

```
END_DATE=2023-11-01 pnpm build
pnpm vrt -u
```

## Environment

| env | value | 備考 |
|:-|:-|:-|
| GOOGLE_ANALYTICS_TRACKING_ID | GAのトラッキングID | ビルド時に使用 |
| GOOGLE_TAGMANAGER_TRACKING_ID | GTMのトラッキングID | ビルド時に使用 |
| ALGOLIA_APP_ID | AlgoliaのAppID | ビルド時に使用 |
| ALGOLIA_API_KEY| Algoliaの更新用APIキー | ビルド時に使用 |
| ALGOLIA_INDEX_NAME| Algoliaのインデックス名 | gatsby-algoliaで使用 |
| GATSBY_ALGOLIA_SEARCH_KEY | Algoliaの検索用APIキー | gatsby-algoliaで使用 |
| GATSBY_ALGOLIA_APP_ID | AlgoliaのAppID | ビルド時に使用 |
| BUILD | ビルド種別 | ビルド時に使用、Cloudflare側で設定[production, preview] |
| START_DATE | YYYY-MM-DD | 設定された値以降の記事データをビルド対象とする、主に開発、テスト、執筆時確認用  |
| END_DATE | YYYY-MM-DD | 設定された値以前の記事データをビルド対象とする、主に開発、テスト、執筆時確認用 |


## 記事作成

記事検索に載せるため画像がなくてもディレクトリを作成する

```
echo article_dir_name \
| xargs -I{} sh -lc "mkdir content/blog/entries/{} && touch content/blog/entries/{}/index.md"
```

