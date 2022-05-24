---
title: "GatsbyでGistの埋め込みを行う"
date: "2022-05-23"
description: "Plugin使うだけ"
tags:
  - Gatsby
  - Gist
---

Gistのページの埋めこみタグだと表示されなかったので調べたら下記のプラグインを使用すれば埋め込みが可能

[gatsby-remark-embed-gist | Gatsby](https://www.gatsbyjs.com/plugins/gatsby-remark-embed-gist/)

- gatsby-config.js

```diff
+          {
+            resolve: "gatsby-remark-embed-gist",
+            options: {}
+          },
```

`gatsby-remark-prismjs`より前に設定を書く必要があるよう
