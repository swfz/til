---
title: "Macのhomebrewでtmux3.3aから3.2aへバージョンを下げる"
date: "2024-02-14"
description: "brew"
tags:
  - Homebrew
  - Mac
  - tmux
---

Homebrewで管理しているtmuxのバージョンを上げたら起動しなくなった

少し前のバージョンにして固定したのでそのときの記録

```shell
[user]$ tmux
[exited]
~ ❯❯❯
[user]$ 0;95;0c>|iTerm2 3.4.22>|iTerm2 3.4.22>|iTerm2 3.4.22
```

```shell
$ tmux -V
tmux 3.3a
```

## バージョンを下げて固定する

brewはインストールするときにFormulaというファイルを読んでインストールしている

で、そのFormulaにどのバージョンをインストールするか記述しているので、Gitで追ってコミットハッシュを指定してあげれば特定バージョンをインストールできるらしい

という記事をよく見たので試してみた

- 対象コミット

[tmux: update 3.2a_1 bottle. · Homebrew/homebrew-core@e44425d](https://github.com/Homebrew/homebrew-core/commit/e44425df5a8b3c8c24073486fa7e355f3ac19657)

```
$ brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/e44425df5a8b3c8c24073486fa7e355f3ac19657/Formula/tmux.rb
Error: Installation of tmux from a GitHub commit URL is unsupported! `brew extract tmux` to a stable tap on GitHub instead.
```

だめだった、Homebrewのv4からこの手法は使えないよう

`brew extract`を使えと

下記のスクリプトを参考にした

[dotfiles/mac/setup.sh at master · muratayusuke/dotfiles](https://github.com/muratayusuke/dotfiles/blob/master/mac/setup.sh)

### tap

```shell
$ brew extract tmux swfz/taps --version 3.2a
Error: No available formula with the name "homebrew/core/tmux".
Please tap it and then try again: brew tap homebrew/core

$ brew tap homebrew/core
Error: Tapping homebrew/core is no longer typically necessary.
Add --force if you are sure you need it done

$ brew tap --force homebrew/core
```

深く追っていないが、いきなり`extract`を実行できなかったのでエラーが案内するとおりにまず`homebrew/core`を取得した

### tap-new

```shell
$ brew tap-new swfz/taps
Initialized empty Git repository in /usr/local/Homebrew/Library/Taps/swfz/homebrew-taps/.git/
```

### extract

```shell
$ brew extract tmux swfz/taps --version 3.2a
==> Searching repository history
==> Writing formula for tmux from revision e44425d to:
/usr/local/Homebrew/Library/Taps/swfz/homebrew-taps/Formula/tmux@3.2a.rb
```

### install

```shell
$ brew install swfz/taps/tmux@3.2a
```

### 確認

```shell
$ tmux -V
tmux 3.2a
```

これでOKそう…

### pin

ふとしたときに更新されてしまわないようにpinしておく

```shell
$ brew pin swfz/taps/tmux@3.2a
$ brew list --pinned
tmux@3.2a
```
