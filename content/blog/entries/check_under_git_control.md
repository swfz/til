---
title: "特定ディレクトリ以下のGit管理されてるディレクトリがあるかチェックする"
date: "2023-09-09"
description: ""
tags:
  - Git
  - ShellScript
---

`sandbox`とかそういう感じのディレクトリを作ってその下に何かしらのHelloWorldやお試しでプロジェクトを作るということをよくやっている

で、その中で形になりそうなものはGitHubに上げておく場合が多いが、途中で飽きてそのままというのもある

たまには精査しておきたいと思い調べて書いた

- gitcontrol.sh

```shell
#!/bin/bash
base_dir="."
target_directory=".git"
for dir in "$base_dir"/*/
do
  if [ ! -d "${dir}${target_directory}" ]; then
    echo "${dir} does not have ${target_directory}"
  fi
done
```

直下のディレクトリを対象にチェックする

`.git`ディレクトリがない場合は出力する

```
$ sh gitcontrol.sh
./confluence/ does not have .git
./gas-ga4-to-pixela/ does not have .git
./react-sample/ does not have .git
./sentry/ does not have .git
./slack-notification/ does not have .git
./sql-parse/ does not have .git
./terraform-aurora-serverless-lambda/ does not have .git
./terraform-workflows-test/ does not have .git
```

こんな感じ

懐かしいディレクトリが出てきた
