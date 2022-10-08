---
title: "StorybookでTailwindcssを適用させる"
date: "2022-10-07"
description: "メモ"
tags:
  - Tailwindcss
  - Storybook
---

Next.jsのアプリケーションにStorybookを入れて動かしてみたがスタイルがあたっていなかったので調べて対応した

storybookのアドオン`addon-postcss`を追加する

- version

```
"storybook": "6.5.12"
```

- addonの追加

```
yarn add -D @storybook/addon-postcss
```

- .storybook/main.js

```diff
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
+    {
+      name: '@storybook/addon-postcss',
+      options: {
+        postcssLoaderOptions: {
+          implementation: require('postcss'),
+        },
+      },
+    }
```

- .storybook/preview.js

```diff
+ import '../styles/globals.css';
```

このcssファイルはTailwindcssを読み込んでいるCSSファイルを指定する