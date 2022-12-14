---
title: "ObsidianのDataviewプラグインで終わったタスクリストを表示する"
date: "2022-12-14"
description: "JavaScriptを書く"
tags:
  - Obsidian
  - Obsidian Plugin
---

自分はObsidianを使っていて、`#daily`タグでデイリーノートを取っている

その中でToDoという項目を用意し、その日やるタスクのToDoリストを毎日作っている

デイリーノートは毎日新しいファイルが作成されるので、1週間を振り返る時に毎日分のファイルを見に行かないと行けないのは不便

ということでDataviewプラグインを使ってさっと確認できるようにしたい

## Dataviewプラグイン

[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)

記事のfrontmatterやタグ、ディレクトリなどの情報をもとにテーブル表示してくれるプラグイン

コードブロックに`dataview`を指定することで表示してくれる

クエリはSQLライクな書き方で問い合わせする

FROMにはページのリストの単位、特定のタグやディレクトリなどを指定する

条件などにファイルの更新日、ファイル名などファイルのメタデータも含められるためある程度なんでもできそう

またSQLライクな書き方以外にもJavaScriptを書くこともできる

その場合はコードブロックに`dataviewjs`を指定する

いくつか使いそうなのを書いてみた

## ToDoリストの直近1週間やったことをリストにする

dailyタグでページのリミットを7にしただけ

本当は`where(page => page.file.ctime)` みたいな感じでフィルタリングしたかったがうまくいかなかったのでいったんこれでお茶を濁した…

- コードブロックの中身

```javascript
dv.taskList(dv.pages("#daily").sort(p => dv.date(p.file.ctime), 'desc').limit(7).file.tasks.where(t => t.completed));
```

- 表示

![alt](obsidian_dataview_done_tasklist01.png)

`dv.pages`で対象のファイルを取得、ソートして最新から7件取得するので過去1週間分のデイリーノートを取得できる

`file.tasks.where`の中の関数でチェック済みなチェックリストのアイテムのみを返す
