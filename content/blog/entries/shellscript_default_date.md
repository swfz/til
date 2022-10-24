---
title: "シェルスクリプトで日付情報を引数から指定するorデフォルトを用いる"
date: "2022-10-25"
description: ""
tags:
  - ShellScript
---

引数がある場合は引数を、ない場合は実行した日（または特定の日数前など）を使って後続の処理を行いたい場合のスニペット


- default_date.sh

```shell
#!/bin/bash

arg=$1

[ -z ${arg} ] && target_date=$(date +"%Y-%m-%d") || target_date=${arg}

echo $target_date
```

```
❯ date +"%Y-%m-%d"
2022-10-24

❯ sh default_date.sh 2022-10-20
2022-10-20

❯ sh default_date.sh
2022-10-24
```