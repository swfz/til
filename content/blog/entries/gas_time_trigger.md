---
title: "GoogleAppsScriptのスケジュール実行をコードで表現する"
date: "2021-11-03"
description: "timeBasedを指定する"
tags:
  - GoogleAppsScript
  - JavaScript
---

GASのコードをGit管理するならスケジューリング設定などもGit管理したい

GAS自体にTriggerを設定する関数が存在するのでそれを使ってコードを書けば初回は手動実行になってしまうが一応管理することが可能

ということで調べた

変更がある場合スケジューリングの作り直しになるのでどちらにしても既存のスケジュールの手動削除が必要そう

まぁこういうスケジュールを設定していますっていうのをコードに残しておくという意味ではメリットがあるくらいだがやらないよりは良いかなって感じ

スケジュールでのTriggerBuilderのドキュメントは下記

[Class ClockTriggerBuilder  |  Apps Script  |  Google Developers](https://developers.google.com/apps-script/reference/script/clock-trigger-builder)

結局今回はこんな感じにした

良くある毎日9:30に実行しますって感じのやつ

- Code.js

```javascript
function setScheduleTrigger() {
  ScriptApp.newTrigger('mainFunction').timeBased().atHour(9).nearMinute(30).everyDays(1).inTimezone("Asia/Tokyo").create();
}
```

`mainFunction`はスケジュールで実行させたい関数名

- nearMinute

ドキュメントから引用

> トリガーが実行される分を指定します（プラスまたはマイナス15分）。 nearMinute（）が呼び出されない場合、ランダムな分の値が使用されます。

とのこと

なのでこの記述だと

<!-- textlint-disable prh -->
毎日9:15~9:45の間に実行するというようなスケジュールトリガーをセットする
<!-- textlint-enable prh -->

完全に固定はできないみたい

- inTimezone

スクリプトのタイムゾーンがデフォルトだが指定もできる