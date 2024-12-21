---
title: "curl: (3) [globbing] error: bad range specification after pos 3"
date: "2020-12-12"
description: "grepにも注意"
tags:
  - curl
  - grep
---

tflintを入れてみようと思いREADMEにしたがいワンライナーで落としてこようと思ったら思わぬところでつまずいた

```shell
$ curl -L "$(curl -Ls https://api.github.com/repos/terraform-linters/tflint/releases/latest | grep -o -E "https://.+?_linux_amd64.zip")" -o tflint.zip && unzip tflint.zip && rm tflint.zip
curl: (3) [globbing] error: bad range specification after pos 3
```

glob…どこかで`[]`や`{}`使っているか?という感じだったが`grep`が悪さをしていた

自分のシェル環境だとデフォルトでgrepの結果に色をつけるようにしていたのでその結果に対して`curl`しようとすることでエスケープシーケンスも含まれてしまっていた

```
$ curl  -Ls https://api.github.com/repos/terraform-linters/tflint/releases/latest | grep -o -E "https://.+?_linux_amd64.zip" > url.txt
$ cat -v url.txt
^[[01;31m^[[Khttps://github.com/terraform-linters/tflint/releases/download/v0.22.0/tflint_linux_amd64.zip^[[m^[[K
```

もともとURLに`[]`や`{}`が含まれているパターンではないのでこの場合の対応は`--globoff`ではだめだった

`grep --color=no`を追加することでcurl対象のURLがプレーンなテキストになるのでcurlできるようになった

エスケープシーケンスはよくやるので気を付けたい
