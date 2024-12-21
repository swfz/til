---
title: "Puppeteerのデバッグ用のテンプレート"
date: "2020-12-07"
description: "よく使う定形コマンド"
tags:
  - Node
  - Puppeteer
---

最初の数行が定型文で貼り付けるだけにしたいので残しておく

- REPL起動

```
node --experimental-repl-await
```

toplevelでawaitを使えるようになるオプションをつける（node12以降）

- REPL

```javascript
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
const page = await browser.newPage();

// この辺からはその時時に合わせて変える
let requestUrl = 'https://example.com'
await page.goto(requestUrl);
let rows = await page.$x('//article');
await (await rows[0].getProperty('textContent')).jsonValue();
await (await (await rows[0].$x('.//a[contains(@role, "link") and contains(@data-focusable, "true")]/time'))[0].getProperty('textContent')).jsonValue();
```
