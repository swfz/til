---
title: "Cloudflare Insightsの独自ドメイン設定時のエラー対応"
date: "2022-07-15"
description: "再設定する"
tags:
  - Cloudflare
---

Cloudflare Insightsが本番でエラーが起きてた

```
Access to resource at 'https://cloudflareinsights.com/cdn-cgi/rum' from origin 'https://til.swfz.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

[Analytics tag not loading due to Cross-Origin Request Blocked - Security - Cloudflare Community](https://community.cloudflare.com/t/analytics-tag-not-loading-due-to-cross-origin-request-blocked/261058/9)

ちょっと古いがカスタムドメインを指定すると起きるよう？

WebAnalyticsを無効化して再度有効化すると正常に読み込めるようになるとのこと

なので設定を変えて再デプロイ、設定を戻して再デプロイ、でエラーが出なくなった
