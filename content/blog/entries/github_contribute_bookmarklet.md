---
title: "GitHubのコントリビュート一覧に飛ぶためのブックマークレット"
date: "2021-09-25"
description: "コントリビュートしたい"
tags:
  - Bookmarklet
  - GitHub
---

以前Twitterで`採用などでGitHubアカウントもらったらこのクエリでコントリビューションみますね`みたいなのを見かけた

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
とりあえずそのうち見るときのためにタブをそのままにしていたが、いろいろな人のも見られるとおもしろいかもと思ってブックマークレットを書いた
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

ユーザーページもしくは対象ユーザーのどこかのリポジトリなど、ユーザー名がURLに存在すれば実行可能

```javascript
(function(){
  const user = window.location.href.split("/")[3];
  const excludeOrgs = [];
  const w = window.open();
  const excludeOrgQuery = excludeOrgs.map(o => `-org%3A${o}`).join('+');
  w.location.href = `https://github.com/pulls?q=involves%3A${user}+-user%3A${user}+${excludeOrgQuery}`;
})()
```

`excludeOrgs`は自分が所属している組織へのPRやissueは除外するための記述

GitHubで仕事の開発している場合は対象組織のPRなども表示されてしまうのでその除外

感想としては自分はあんまりコントリビュートできてません!ということがわかりました。まる。
