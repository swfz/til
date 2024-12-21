---
title: "画像をbase64化してimgタグで読み込む"
date: "2024-09-12"
description: ""
tags:
  - Image
  - HTML
---

denoでサイト作っていて、サンプル画像を伴うREADME的なページを作っていた

publicディレクトリを作りそこに画像を配置し、ホストしてしまうと画像レスポンスを返す用の処理も書かないといけないし、アクセスログにも乗ってくるので微妙だなーと思って埋め込むことにした

- base64

```bash
base64 -w 0 hoge.png
```

`-w`は改行までの文字数指定

`-w 0`で改行なしのテキストを表示してくれる

- manの結果

```text
-w, --wrap=COLS  
wrap encoded lines after COLS character (default 76). Use 0 to disable line wrapping
```

- 画像の表示

```html
<img src="data:image/png;base64,{base64化したテキスト}">
```

これでOK
