---
title: "Gemのメンテ時などで使用するコマンドの覚書"
date: "2021-01-04"
description: "リリースとかまで"
tags:
  - Ruby
  - Gem
---

毎度忘れるので自分用のメモとして

`hatenablog_publisher`を例として上げておく

[swfz/hatenablog_publisher: hatenablog publish with imagefile](https://github.com/swfz/hatenablog_publisher)

CDとかで自動化しているわけではないのでそのうち…

## ローカルでの修正

適当なディレクトリにチェックアウトして使う側のGemfileを正

```diff
+# gem 'hatenablog_publisher'
+gem 'hatenablog_publisher', path: '/home/vagrant/sandbox/hatenablog_publisher'
```

## 動作確認

デバッグしたりして動作確認する

## リリース

version.rbを修正（パッチ、マイナーなど上げる）

Gemfile.lockはbuildすると自動でバージョン変えてくれる

### ありがちエラー

```
There are files that need to be committed first.
```

未コミットがない状態だと実行できるのでstashなりcommitなりしておく

```
rake build
rake release
```

### 前提

前提としてRubyGemsのcredentialsが`~/.gem/credentials`に必要

## 使う側で更新

```
bundle update hatenablog_publisher
```

対象のGemだけ更新する場合

```
bundle update --source hatenablog_publisher
```



