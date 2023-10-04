# TIL

[swfz.memo](https://til.swfz.io)

## development

```
yarn dev
```

### Algolia APIのモックデータ

開発では基本的にAlgoliaにリクエストが飛ばないようになっている

APIの内容が変わった場合は本番レスポンスを取得して各種JSONを更新する

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
