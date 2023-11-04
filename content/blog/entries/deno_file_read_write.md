---
title: "Denoでファイルの読み書き"
date: "2023-11-01"
description: "用途によって色々ある"
tags:
  - Deno
  - TypeScript
---

開発中に、よく実際にAPIを叩いた結果を読ませたり書き込んだりする処理を入れたくなる時があるのでそのときのためのメモ

## 読み込み

readFile, readFileSync, readTextFile, readTextFileSyncなどがある

`Sync`はdeno deployには対応していないらしいのでdeploy使う場合は`Sync`を使わないほうが良い

便利コマンドとかの場合はSyncつかっても問題ない

- readFile

```typescript
const decoder = new TextDecoder('utf-8')
const file = await Deno.readFile('contributions.json')
const data = JSON.parse(decoder.decode(file))
```
### radFile, readTextFileの違い

`readFile`は戻り値が`Unit8Array`

テキストファイルを読む場合decoderを挟む必要がある

### ただのテキストを読む場合

```typescript
const data = JSON.parse(await Deno.readTextFile('contributions.json'))
```

1行で書ける

どれを使うにしても実行時に`--allow-read`オプションが必要

## 書き込み

```typescript
const data = await getContributions();
await Deno.writeTextFile('contributions.json', JSON.stringify(data))
```

テキスト書き込むだけならこれでOK

実行時に`--allow-write`オプションが必要

- 参考

[【Deno1.16～】ローカルファイルの読み込み方法4種 #JavaScript - Qiita](https://qiita.com/access3151fq/items/48e17d1363de39d01ad1)