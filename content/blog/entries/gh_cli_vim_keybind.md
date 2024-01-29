---
title: "GitHub CLIの選択肢移動でVimのキーを使いたい"
date: "2024-01-30"
description: "Esc押下するだけ"
tags:
  - Vim
  - GitHub CLI
---

GitHub CLIでは各種コマンドで選択肢を選ぶときに`survery`というパッケージを用いている

で、このパッケージを使って選択肢を移動するときにVimモードで移動できたら良いなと思っていた

`Ctrl+j`,`Ctrl+k`で上下移動的な感じ

で、いろいろ探していたらすでにVimモードがあるらしく、選択肢が表示された時点で`Esc`キーを押下するとその後は`j`,`k`で上下移動できる

[Document survey's VimMode · Issue #1483 · cli/cli](https://github.com/cli/cli/issues/1483)

しらなかった!!!

<!-- textlint-disable prh -->
ターミナル上でのインタラクティブフィルタツールの移動は`Ctrl+j`と`Ctrl+k`なので若干違和感は残るが、以前より全然操作しやすくなった
<!-- textlint-enable prh -->

ただ、survery自体はメンテナンス終了してた…

[AlecAivazis/survey: A golang library for building interactive and accessible prompts with full support for windows and posix terminals.](https://github.com/AlecAivazis/survey)

これからどうなるのかは…ちょっとわかりません
