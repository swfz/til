---
title: "NotionのAPIでページにコンテンツを追加する"
date: "2021-11-24"
description: "desc"
tags:
  - Notion
  - ShellScript
---

ページにコンテンツ（block）を追加する

pageエンドポイントに対してリクエストするのかと思っていたけど

公式ドキュメントに

[Block object](https://developers.notion.com/reference/block)

> A block object represents content within Notion. Blocks can be text, lists, media, and more. A page is a type of block, too!

とありページもブロックと同等に扱うとあった

なるほど、だからblockのエンドポイントしかみつからなかったのか

ドキュメントの`block_id`を`page_id`に置き換えてAPIをたたくとpage直下のコンテンツにテキストを追加できるという感じ

ほとんど公式と一緒だがとりあえずサンプル

- append.sh

```bash
#!/bin/bash

page_id="dummy_page_id"
text="hello world"

curl -X PATCH "https://api.notion.com/v1/blocks/${page_id}/children" \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2021-08-16" \
  --data @- <<EOS
{
  "children": [
  {
    "object": "block",
    "type": "paragraph",
    "paragraph": {
      "text": [{"type": "text", "text": {"content": "Hi! Text ${text}"}}]
    }
  }]
}
EOS
```

Notion上でテキストが追加されたことを確認できた

ある程度触ってみたけど割と扱いやすい気がしてきた