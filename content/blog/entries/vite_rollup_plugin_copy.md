---
title: "vite rollup-pluginでChrome拡張内のJSのみから参照されているイメージをどうするか"
date: "2022-06-15"
description: "copyする"
tags:
  - Chrome拡張
  - vite
  - rollup plugin
---

## 背景

vite+rollup-plugin-chrome-extensionを用いてChrome拡張を作っていた

拡張を作っていく中でJSのみから参照されるイメージ（SVG）がビルド後のディレクトリに含まれていないことに気付いて調べた

## 調査した結果

公式ドキュメントから

[Untitled – Extend Chrome](https://www.extend-chrome.dev/rollup-plugin)

What about the assets? Like images, icons, or CSS files?

HTMLに表示されているイメージは自動で`web_accessible_resources`に追加されるのと配信用のディレクトリに自動でコピーされる

が、JSで呼び出しているものは別途プラグインが必要とのこと

調べてみると

[typescript + vite + reactを使ったChrome拡張機能の土台を作って検証してみた](https://qiita.com/FaithnhMaster/items/2b8f3e6a5b502a67e444)

この中で`rollup-plugin-copy`を使用すればOKそう

ということで使ってみた

- インストール

```shell
yarn add rollup-plugin-copy
```

- vite.config.ts

```diff
 export default defineConfig({
-  plugins: [react(), chromeExtension({ manifest })],
+  plugins: [
+    react(),
+    chromeExtension({ manifest }),
+    copy({
+      verbose: true,
+      hook: 'writeBundle',
+      targets: [
+        {
+          src: 'images/sign_language_black_24dp.svg',
+          dest: 'dist/images'
+        }
+      ],
+    }),
+  ],
 });
```

上記でイメージの配信用ディレクトリへのコピーはできたが`web_accessible_resources`には自動で設定が追加されなかった

完全にworkaroundだがビルド後にスクリプトを挟んで`web_accessible_resources`に追加するという処理を追加した…

- package.json

```json
"build": "tsc && vite build && node script/patch_manifest.js",
```

- script/patch_manifest.js

```javascript
const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json'));
const resources = manifest.web_accessible_resources.map(item => item.resources).flat();

const patchedManifest = {
  ...manifest,
  web_accessible_resources: [
    {
      matches: [
        "<all_urls>"
      ],
      resources: [...resources, "images/sign_language_black_24dp.svg"],
      use_dynamic_url: true
    }
  ]
}

fs.writeFileSync('dist/manifest.json',JSON.stringify(patchedManifest, null, 2));
```

このworkaroundの処理自体が[他の問題](https://github.com/swfz/chrome-extension-google-slide-usertool-comment-stream/issues/2)も解決しているが

今回のスコープで言うと

Chrome拡張のJSのみで参照されている"images/sign_language_black_24dp.svg"を`web_accessible_resources`にも追加する

ということを行っている

これで無事Chrome拡張を動作させることが可能となった