---
title: "Nodeのsharpでsvgをpngへ変換する"
date: "2022-09-29"
description: ""
tags:
  - Node
  - SVG
  - PNG
---

SVG出力されたレスポンスをPNGに変換する

```javascript
#!/usr/bin/env zx

const sharp = require('sharp');

const svgText = await fetch('https://localhost:8081/sample.svg').then(res => res.text())
sharp(Buffer.from(svgText, 'utf-8')).toFile('sample.png')
```

sharpという画像処理をやってくれるライブラリを使用した

簡単

ただdenoやCloudFlare Workersで使おうとすると使えなさそうだった