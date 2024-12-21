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

```
bundle update --source hatenablog_publisher
```

### 2022-05-07追記

対象のGemだけ更新する場合


- 参考
[bundle updateで特定のgemのみ更新する時に気をつけるべきポイント - 10nin blog](https://scrapbox.io/10nin/bundle_update%E3%81%A7%E7%89%B9%E5%AE%9A%E3%81%AEgem%E3%81%AE%E3%81%BF%E6%9B%B4%E6%96%B0%E3%81%99%E3%82%8B%E6%99%82%E3%81%AB%E6%B0%97%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B%E3%81%B9%E3%81%8D%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88)

sourceで指定するより`--conservative`のほうが良いらしい

```
bundle update --conservative activesupport
```
