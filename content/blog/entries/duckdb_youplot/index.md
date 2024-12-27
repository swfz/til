---
title: "DuckDB + YouPlotでCUIのグラフ表示"
date: "2024-12-20"
description: "Ruby製"
tags:
- Command
- DuckDB
- Ruby
---

DuckDBの公式ドキュメントにCUIでの可視化ツールの紹介が載っていた

[CLI Charting with YouPlot – DuckDB](https://duckdb.org/docs/guides/data_viewers/youplot.html)

YouPlot

[red-data-tools/YouPlot: A command line tool that draw plots on the terminal.](https://github.com/red-data-tools/YouPlot)

Ruby製らしい

内部的にUnicodePlotを使っているらしい、どちらもPlotライブラリなので役割がどう違うのかイメージが付いていない…

サンプルでは次の流れでCUIのグラフ化を行っている

- APIを叩いてデータを取得
- DuckDBに流して集計
- 結果をCSVフォーマットにしてstdoutへ出力
- youplotで可視化


こういうの好きなんだよなー、とりあえず試してみる

## install

```bash
gem install youplot
```

## 試す

GitHubのイベントデータのサンプルを実行してみた

これは!!

```bash
curl -sL "https://api.github.com/users/swfz/events?per_page=100" \
| duckdb -s "COPY (SELECT type, count(*) AS event_count FROM read_json_auto('/dev/stdin') GROUP BY 1 ORDER BY 2 DESC LIMIT 10) TO '/dev/stdout' WITH (FORMAT 'csv', HEADER)" \
| uplot bar -d, -H -t "GitHub Events for @swfz"  
                             GitHub Events for @swfz
                    ┌                                        ┐
   PullRequestEvent ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 34.0
          PushEvent ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 32.0
        DeleteEvent ┤■■■■■■■■■■■■■■■■■■ 18.0
        CreateEvent ┤■■■■■■■■■■■■■■■■ 16.0
```

![alt](duckdb_youplot01.gif)

### CSV出力

途中出力のCSV形式はこんな感じ

```bash
$ curl -sL "https://api.github.com/users/swfz/events?per_page=100" | duckdb -s "COPY (SELECT type, count(*) AS event_count FROM read_json_auto('/dev/stdin') GROUP BY 1 ORDER BY 2 DESC LIMIT 10) TO '/dev/stdout' WITH (FORMAT 'csv', HEADER)"

type,event_count
PullRequestEvent,34
PushEvent,32
DeleteEvent,18
CreateEvent,16
```

まぁわかりやすい

YouPlotのチャート種別によっても必要な形式は異なる

GitHubのREADMEに各種チャートのサンプルコマンドが載っているがやはりローカルでワンショットの可視化とかの使い方がよさそう

使い方習熟したらログ調査とかは捗りそう

たまに見たいパターンの場合でも、わざわざデータをBQに入れてLookerStudioで可視化して…とまでやるには重いよな…って場合、簡易的なツールとして使えそう

ただ、timeseriesデータは扱えないみたい…これが一番欲しい感ある…

[Feature suggestion: Support for timeseries data · Issue #52 · red-data-tools/YouPlot](https://github.com/red-data-tools/YouPlot/issues/52)

Rubyなら自分でコード書いてPR出せるかな?

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
余裕ができたらやってみたいと思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

