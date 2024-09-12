---
title: "ShellScript内で実行するコマンドのJSON引数をよしなにあつかいたい"
date: "2024-04-29"
description: "jqかヒアドキュメント"
tags:
  - ShellScript
  - GoogleCloud
  - jq
---

- gcloudコマンドを実行する例

gcloud pubsubでpublishする際にJSONをメッセージとして渡す場合

```bash
val=50
key="score"
date="2024-04-23"

message="{\"val\": $val, \"key\": \"$key\", \"date\": \"$date\"}"

gcloud pubsub topics publish metrics --message="$message" --attribute="source=obsidian-dailynote-metadata"
```

素直にやるとエスケープする必要があり面倒…

## jqを使う方法

jqを通すだけで解決できる

```bash
message=$(jq -n \
    --arg val "$val" \
    --arg key "$key" \
    --arg date "$date" \
    '{val: ($val | tonumber), key: $key, date: $date}')
```

- `jq -n`で新しいJSONオブジェクトを作成
- `--arg`オプションでjqに変数を渡し、JSONオブジェクト内でこれらの変数を使用

## ヒアドキュメントを使う方法

ヒアドキュメントでも解決できる

```bash
message=$(cat << EOF
{
  "val": $val,
  "key": "$key",
  "date": "$date"
}
EOF
)
```

ヒアドキュメントで定義されたテキストを`cat`コマンドで取得し`message`に代入している

覚えておいて損はないはず
