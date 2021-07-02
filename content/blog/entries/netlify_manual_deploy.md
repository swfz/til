---
title: "Netlifyに手動でデプロイする"
date: "2021-07-03"
description: "netlify-cliを使う"
tags:
  - Netlify
  - Gatsby
---

割と月の早い段階でAlgoliaの使用制限で継続的デプロイができなくなってしまったのでCLI経由でデプロイできないか調べて試した

## 前提

- Netlifyでビルドとデプロイを行っていてビルド時に都度Algoliaのインデックス更新している
- DependabotやRenovateなどのパッケージの更新でも上記処理が走ってしまっていたので利用上限に達してしまったよう

- build時エラーログ

```
ERROR

failed to index to Algolia Operations quota exceeded. Change plan to get more Operations.
Error: Operations quota exceeded. Change plan to get more Operations.
```

途中で落ちてしまいデプロイできないのでIndexの再生成だけ除外して記事をデプロイする

- Netlify-cliのインストール

```shell
yarn add -D netlify-cli
```

- ログイン

```
yarn netlify login
```

ブラウザに遷移して`Authorize`をクリックして認証する

configファイルにtokenが出力される

ファイルの場所は `~/.config/netlify/config.json`に置かれる（OSによる）

- デプロイ

`.env.production`にはデプロイに必要な環境変数が入っている

```
$ envfile .env.production yarn netlify deploy
yarn run v1.22.10
$ /home/user/til/node_modules/.bin/netlify deploy
This folder isn't linked to a site yet
? What would you like to do? Link this directory to an existing site

netlify link will connect this folder to a site on Netlify

? How do you want to link this folder to a site? Use current git remote origin (https://github.com/swfz/til)

Looking for sites connected to 'https://github.com/swfz/til'...


Directory Linked

Site url:  https://til.swfz.io

Site id saved to /home/user/til/.netlify/state.json

You can now run other `netlify` cli commands in this directory
Deploy path: /home/user/til/public
Deploying to draft URL...
✔ Finished hashing 641 files
✔ CDN requesting 377 files
✔ Finished uploading 377 assets
✔ Deploy is live!

Logs:              https://app.netlify.com/sites/hoge/deploys/xxxxxxxxxxxxxxxxxxxxxxxxxxx
Website Draft URL: https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx--hoge.netlify.app

If everything looks good on your draft URL, deploy it to your main site URL with the --prod flag.
netlify deploy --prod

Done in 118.77s.
```

`--prod`オプションを付けない場合はデプロイプレビュー用のよう

- 本番デプロイ

```
$ envfile .env.production yarn build
$ envfile .env.production yarn netlify deploy --prod
Deploy path: /home/user/deploy-til/public
Deploying to main site URL...
✔ Finished hashing 450 files
✔ CDN requesting 249 files
✔ Finished uploading 249 assets
✔ Deploy is live!

Logs:              https://app.netlify.com/sites/.....
Unique Deploy URL: https://......netlify.app
Website URL:       https://til.swfz.io
Done in 51.37s.
```

public以下のファイル群をNetlifyにアップロードする

これで無事デプロイできた

CLIのドキュメントは下記

[Get started with Netlify CLI | Netlify Docs](https://docs.netlify.com/cli/get-started/)

## Algoliaのインデックス更新のコントロール

とりあえず手動デプロイで当座はしのげるようになったが来月も同じ様になってしまうと困るので対策する

AlgoliaのIndexingが必要なのは記事の更新があったときのみなので条件によって挙動を分ける

ドキュメントでは`netlify.toml`に設定書けば良いよ、となっているがGUIからの基本的な設定（主にシークレットなどの情報）とうまい具合にマージしてくれるわけではないらしい

そうなると各種キーがデプロイ時に必要なのでパブリックなリポジトリでは`netlify.toml`を使って設定は行えない

[File-based configuration | Netlify Docs](https://docs.netlify.com/configure-builds/file-based-configuration/)

[https://docs.netlify.com/configure-builds/file-based-configuration/:embed:cite]

ドキュメントを眺めていると

`$CACHED_COMMIT_REF`、`$COMMIT_REF`という環境変数が用意されているようなのでそれを用いてラップするコマンドを書いてデプロイするようにした

- deploy.sh

```bash
#!/bin/bash

echo $CACHED_COMMIT_REF
echo $COMMIT_REF

# 差分があると終了コード1
git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF content/blog/entries/

rc=$?

if [ "$rc" = "1" ]; then
  echo "content changed."
  CONTENT_CHANGED=true gatsby build
else
  echo "content not changed."
  CONTENT_CHANGED=false gatsby build
fi
```

記事のディレクトリに変更があるかどうかで`CONTENT_CHANGED`環境変数を切り分ける

- gatsby-config.js

```javascript
skipIndexing: (process.env.BRANCH !== 'master' || process.env.CONTENT_CHANGED === 'false'),
```

これでAlgoliaへのインデックス情報の更新は

- `master`ブランチのとき
- 記事情報が更新されたとき

<!-- textlint-disable prh -->
が満たされて初めて更新されるようになった
<!-- textlint-enable prh -->

ここまでやっていまさらだが、ざっとしか調べてないのでもし検索でリミットに達していたのなら来月も手動デプロイが発生するかもw