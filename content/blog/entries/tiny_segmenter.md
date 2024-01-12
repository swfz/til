---
title: "JavaScriptで辞書不要の分かち書きを行う"
date: "2023-07-27"
description: "TinySegmenter"
tags:
  - TinySegmenter
  - JavaScript
  - Deno
---

分かち書きをしたくて少し調べてみたら辞書を使わず機械学習で検出するライブラリがあるということで使ってみた

辞書が不要なので未知の語句に対しても精度保てそうって感じらしい

[leungwensen/tiny-segmenter: Mirror of TinySegmenter, the super compact Japanese tokenizer in JavaScript.](https://github.com/leungwensen/tiny-segmenter)

README通りに書けばOKだったのですぐ動いた

npmに上がってるのでdenoから使う場合は`esm.sh`でimportして使用した

- tiny_segmenter_sample.ts

```javascript
import TinySegmenter from "https://esm.sh/tiny-segmenter@0.2.0";

const title = "Slack APIで特定チャンネルの会話履歴を取得する";

const segmenter = new TinySegmenter();
const segments = segmenter.segment(title);
console.log(title);
```

- 実行

直近の記事タイトルを拝借してきた

```shell
deno run tiny_segmenter_sample.ts
[
  "Slack", " ",
  "API",   "で",
  "特定",  "チャンネル",
  "の",    "会話",
  "履歴",  "を",
  "取得",  "する"
]
```

少なくともここで区切ってしまう?みたいなのが多くなければOKなので大丈夫そう

ライブラリ読み込みするだけで使えるので気軽に使えて良い

ただ、メンテナンスはされてなさそうなので若干の不安が残るが個人使用なら…
