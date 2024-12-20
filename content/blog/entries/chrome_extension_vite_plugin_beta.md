---
title: "chrome拡張が動かなくなってた"
date: "2024-12-05"
description: "betaでは対応済み"
tags:
  - Chrome拡張
  - Vite
---

90秒で拡張が作れる!で結構知られた感じがある`rollup-plugin-chrome-extension`だが、最近ビルドが通らなくなってしまった

で、GitHubに行って調べてみると

[crxjs/chrome-extension-tools: Bundling Chrome Extensions can be pretty complex. It doesn't have to be.](https://github.com/crxjs/chrome-extension-tools)

新たに`@crxjs/vite-plugin`というのが出てた、以前気付かなかっただけかはわからないがのりで変更してみるかということで変えてみた

`@crxjs/vite-plugin`に変更

そしたらviteとのかみ合わせが悪いようだったので

viteを4->5に上げた、そしたら違うエラーが出てきた

## buildが失敗する

```
2024-11-21T11:59:00.4021417Z [31m[crx:content-script-resources] Error: vite manifest is missing
2024-11-21T11:59:00.4025323Z     at Object.renderCrxManifest (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/@crxjs+vite-plugin@1.0.14_vite@5.4.11_@types+node@20.14.15_/node_modules/@crxjs/vite-plugin/dist/index.mjs:3240:21)
2024-11-21T11:59:00.4029735Z     at Object.generateBundle (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/@crxjs+vite-plugin@1.0.14_vite@5.4.11_@types+node@20.14.15_/node_modules/@crxjs/vite-plugin/dist/index.mjs:2922:60)
2024-11-21T11:59:00.4031840Z     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
2024-11-21T11:59:00.4033813Z     at async Bundle.generate (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/rollup@4.27.3/node_modules/rollup/dist/es/shared/node-entry.js:19094:9)
2024-11-21T11:59:00.4036458Z     at async file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/rollup@4.27.3/node_modules/rollup/dist/es/shared/node-entry.js:21773:27
2024-11-21T11:59:00.4039250Z     at async catchUnfinishedHookActions (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/rollup@4.27.3/node_modules/rollup/dist/es/shared/node-entry.js:21155:16)
2024-11-21T11:59:00.4042071Z     at async build (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/vite@5.4.11_@types+node@20.14.15/node_modules/vite/dist/node/chunks/dep-CB_7IfJ-.js:65449:16)
2024-11-21T11:59:00.4044894Z     at async CAC.<anonymous> (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/vite@5.4.11_@types+node@20.14.15/node_modules/vite/dist/node/cli.js:828:5)[39m
2024-11-21T11:59:00.4046518Z [31mx[39m Build failed in 760ms
2024-11-21T11:59:00.4046960Z [31merror during build:
2024-11-21T11:59:00.4047806Z [31m[crx:manifest-post] Error in crx:content-script-resources.renderCrxManifest[31m
2024-11-21T11:59:00.4049948Z     at Object.generateBundle (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/@crxjs+vite-plugin@1.0.14_vite@5.4.11_@types+node@20.14.15_/node_modules/@crxjs/vite-plugin/dist/index.mjs:2933:19)
2024-11-21T11:59:00.4051747Z     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
2024-11-21T11:59:00.4053966Z     at async Bundle.generate (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/rollup@4.27.3/node_modules/rollup/dist/es/shared/node-entry.js:19094:9)
2024-11-21T11:59:00.4057465Z     at async file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/rollup@4.27.3/node_modules/rollup/dist/es/shared/node-entry.js:21773:27
2024-11-21T11:59:00.4061411Z     at async catchUnfinishedHookActions (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/rollup@4.27.3/node_modules/rollup/dist/es/shared/node-entry.js:21155:16)
2024-11-21T11:59:00.4064389Z     at async build (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/vite@5.4.11_@types+node@20.14.15/node_modules/vite/dist/node/chunks/dep-CB_7IfJ-.js:65449:16)
2024-11-21T11:59:00.4067164Z     at async CAC.<anonymous> (file:///home/runner/work/chrome-extension-google-slide-usertool-comment-stream/chrome-extension-google-slide-usertool-comment-stream/node_modules/.pnpm/vite@5.4.11_@types+node@20.14.15/node_modules/vite/dist/node/cli.js:828:5)[39m
2024-11-21T11:59:00.4185705Z  ELIFECYCLE  Command failed with exit code 1.
2024-11-21T11:59:00.4391698Z ##[error]Process completed with exit code 1.
```

[【CRSJS 】vite5でcontent_scriptsを書くとエラーになったので調べてみた #vite - Qiita](https://qiita.com/naokikobashi/items/9becd14d3693d6f760f5)

同じ状況で調査してくれたほうがいたよう

[Build error [crx:web-accessible-resources] TypeError: OutputBundle["manifest.json"] is undefined · Issue #836 · crxjs/chrome-extension-tools](https://github.com/crxjs/chrome-extension-tools/issues/836)

issue見に行ったら現在はCloseされているよう…？

releaseみたらStableなバージョンは2022-10-16の`1.0.14`で止まっている…

Betaのほうは更新されているようなのでやむなくBetaを入れて動かした

```
pn i -D @crxjs/vite-plugin@beta
```

で`dev`起動したらでなくなった

このケースに限らずだが、JavaScript周りは少し時間が経つとメンテナンス滞る→依存関係が複雑になる→ビルドすら通らなくなるというケースが多いなぁ

場合によっては別のツール選定をするかパッチ当てて直すかとかしかなくなってくる状況だし

なかなか厳しい…

