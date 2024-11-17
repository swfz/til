---
title: 欲しかったのはREADMEのコードブロック実行ではなかった
date: "2024-11-12"
description: "README+peco"
tags:
  - ShellScript
  - Peco
  - Zsh
---

いつも使っているすぐには出てこないくらいの量のオプションを指定したコマンドを新しい環境で実行したい

が、履歴に残っていないので他の環境からコピーしてくるなどしないといけないケースが発生して不便に感じていた

ということで、Markdownからコードブロックを実行するみたいなツールがあったので試してみた

`zx`, `xc`あたり

で、試していたら結局コマンドではなく次のような項目を満たせれば何でも良かったということに気がついた

- ある程度書いたREADME
- フィルタリングしてコンソール上に出力させる何か

pecoでフィルタリングしてコンソール上に出力するだけでOKだった

## 設定

zshの設定に下記を加える

```shell
function peco-p() {
  selected=$@
  if [ -n "$selected" ]; then
    BUFFER="${BUFFER}${selected}"
    # カーソル位置を末尾に移動
    CURSOR=$#BUFFER
  fi
}

function peco-file-line () {
  local line="$(cat README.md | peco)"
  peco-p ${line}
}
zle -N peco-file-line
bindkey '^gm' peco-file-line
```

これでREADMEがあるディレクトリで`Ctrl+g` + `m` を押下すればREADMEからフィルタリングができる

こんな感じ

![alt](command_from_filtering_readme01.gif)

この手の話は履歴から持ってくるでも良いのでは?ってはなしもあるが、デバイスまたいだ場合などで初回実行で困る

これならREADMEにしっかり残しておこうという動機づけにもなる

もっと汎用的なコマンドや使い方だったらcheatとかを使えば良いかなと思っていたけどリポジトリ特有のものとかそういうのはこれでよい感

今度はタスクランナーとの比較っていう話になってきそうだけど今のところは個人プロジェクトだったらこれで十分

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
まぁ仕事だとTaskfileとかその辺なのかなー周りで最近聞くしなーとちょっと気になっている、そのうち触ってみようと思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->
