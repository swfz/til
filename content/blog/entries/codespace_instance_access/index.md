---
title: "gh cliでCodespace上のインスタンスにファイルをコピーする"
date: "2021-12-07"
description: "gh cli"
tags:
  - GitHub
  - Codespace
---

やりたい機会があったので調べてみた

[Using Codespaces with GitHub CLI - GitHub Docs](https://docs.github.com/ja/codespaces/developing-in-codespaces/using-codespaces-with-github-cli)

ドキュメントを見れば解決ではある

## ファイルのコピー

```
$ gh codespace cp -e ~/memo/hoge.png 'remote:/workspaces/til/'
? Choose codespace: swfz/til: master* [swfz-til-xxxxxxxxxxxx]
hoge.png                                                                                                      100%   51KB 220.8KB/s   00:00
```

どのcodespaceに接続するか選択する、もしくは事前に調べておいて`-c`オプションで指定する

gh_codespace_cp01.png

`-e`はヘルプを見れば分かるがexpand

''で囲った中身をremote側で展開するためのもの

なので↑のような書き方になっている

GitHubのCLIが使えればOKなのでWSL2の中から特定のファイルをコピーする、といった使い方もできる

## SSH接続

sshもできる

```bash
$ gh codespace ssh -c swfz-til-xxxxxxxxxxxx
```

`-c`で対象のcodespaceを指定しない場合はインタラクティブに選択させてくれる

VS Codeのターミナルだと一部ショートカットが競合してしまったりすることがあるのでSSH接続していろいろやったほうが何も気にしなくてよいこともある

## おわり

あらためてGitHubのCLI便利だな!と感じた
