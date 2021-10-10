---
title: "tmuxで新規window/paneを起動したときの設定"
date: "2021-10-10"
description: "オプション指定するだけだった"
tags:
  - tmux
---

開発環境を作り直すことになってしまったので作り直していたらいくつか不具合にぶつかったのでそのうちの1つのメモ

新たに起動したセッションをzshで起動したかったが起動せずbashで起動される状態になってしまった

書いたときのバージョン

```
Ubuntu: 20.04
tmux: 3.2a
```

デフォルトのシェルはzshなのになぜ…と調べてみると

同じ人が大勢いたよう

[zsh - How can I make tmux use my default shell? - Super User](https://superuser.com/questions/253786/how-can-i-make-tmux-use-my-default-shell)

↑に解決方法が載っていた

- tmux.conf

```
set-option -g default-shell $SHELL
```

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
いつからかこのオプションを指定しないといけないようになったのかとは思うものの明示的に指定しておいたほうが良いのは確かなので設定を追加した
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->
