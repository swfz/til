---
title: "Twitterで共有されたURLから自分のブログのURLを特定したい"
date: "2021-05-12"
description: "curlでリダイレクト先を追える"
tags:
  - curl
---

TwitterでURLが共有されると短縮URL化されて`t.co...`という形式のURLになる

ブログなどのエゴサをしていると検索には引っかかるが

データ収集を自動化するとどの記事かというひも付けがデータ上できないので`t.co...`の先の記事URLが欲しい

よく考えたら`curl`でOKっていうところでやってみた

## リダイレクト先を表示するオプション

```
--write-out "%{redirect_url}"
```

でリダイレクト先のURLを表示してくれるのでそれを記録すれば良い

実際にたたいてみると

`https://t.co/...`

`https://htn.to/...`

`https://b.hatena.ne.jp/-/redirect?code=`

を経由してやっと目的のURLへたどり着くことができた

たどり着くことが可能なら特定も可能ということでさくっとスクリプトを書いた

```shell
#!/bin/bash

url=$1

query(){
  target_url=$1
  result=$(curl --silent --output /dev/null --write-out "%{redirect_url}" "${target_url}")

  redirected=$(echo ${result} | grep http | wc -l)
  if [ ${redirected} -eq 0 ]; then
    echo ${url},${target_url}
    exit 0
  fi

  matched=$(echo ${result} | grep '^https\?://swfz.hatenablog.com' | wc -l)

  if [ ${matched} -eq 0 ]; then
    query ${result}
  else
    formatted=$(echo ${result} | sed -e 's/\?.*//')
    echo ${url},${formatted}
  fi
}

query ${url}
```

一応リダイレクト先がない場合無限ループにならないよう実装した

あと自分の記事のURLのPVとしてはカウントされないが経由するサービスのPVとしてはカウントされてしまうはずなので乱用は厳禁

これでめでたく記事と言及ツイートのひも付けができそう

過去のデータもよしなにやってしまおうと思い実行してみたら経由するURLの中にすでに運営終了しているサービスが存在し、たどれないみたいなパターンがぼちぼちあった

そういうのはツイートに遷移してタイトルなりで判断して手動でデータ埋めるしかないなーという運びとなった

完全に自動化って難しいですね…
