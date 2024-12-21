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

- github_contribute.js

```javascript
(function(){
  const user = window.location.href.split("/")[3];
  const excludeOrgs = [];
  const w = window.open();
  const excludeOrgQuery = excludeOrgs.map(o => `-org%3A${o}`).join('+');
  w.location.href = `https://github.com/pulls?q=involves%3A${user}+-user%3A${user}+${excludeOrgQuery}`;
})()
```

- ブックマークバーへの貼り付け用出力

```shell
$ cat github_contribute.js |  sed -e ':loop;N;$!b loop;s/\n/ /g' -e 's/ \+/%20/g' -e 's/^/javascript:/'
javascript:(function(){%20const%20user%20=%20window.location.href.split("/")[3];%20const%20excludeOrgs%20=%20[];%20const%20w%20=%20window.open();%20const%20excludeOrgQuery%20=%20excludeOrgs.map(o%20=>%20`-org%3A${o}`).join('+');%20w.location.href%20=%20`https://github.com/pulls?q=involves%3A${user}+-user%3A${user}+${excludeOrgQuery}`;%20})()
```

`excludeOrgs`は自分が所属している組織へのPRやissueは除外するための記述

GitHubで仕事の開発している場合は対象組織のPRなども表示されてしまうのでその除外

感想としては自分はあんまりコントリビュートできてません!ということがわかりました。まる。
