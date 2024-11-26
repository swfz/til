---
title: "GitHub Actions+Gitでのマルチバイト文字列表示"
date: "2024-11-26"
description: "core.quotepath"
tags:
  - Git
  - GitHub Actions
---

マルチバイト文字列をActionsの中で扱う場合に気を付けようという話

`git diff --name-only`で出力される内容からマルチバイト文字列を含むファイル名をgrepで検索して後続につなげるような処理をしたかった

```shell
git diff --name-only | grep --color=no 'ファイル名' | xargs ....
```

というイメージ

ローカルではうまく動いたのでActionsの環境でも動かしてみたが期待通りの動作をせず

pipefail使っていなかったからってのもあるけど原因を突きとめるまで時間をとってしまった

で、追っていったら`git diff --name-only`の結果が下記のようになっていた

```
'\262\267\343\201\206\343\202\202\343\201\256.md'
```

UTF-8エンコーディングされたバイト列が表示されていた…なるほどね…

```shell
$ printf '\262\267\343\201\206\343\202\202\343\201\256.md'
買うもの.md
```

pipeの後続でこの値ありきの処理をしていたのでgrepに引っかからずそれ以降の処理がされなかったというもの

あんまりマルチバイト文字列をそのまま扱うっていうパターンがなかったのもあるが…

## 対応

下記どちらかで対応できる

```
git config --global core.quotepath false
```

```
git -c core.quotepath=false diff --name-only
```

気を付けよう

よく見たらローカルの`.gitconfig`には設定がしっかり入っていた

### pipefail

蛇足だが基本的にActionsに限らずシェルスクリプトではpipefail入れておいたほうがどこで問題があるか気付きやすいので入れておいたほうが良いといのをあらためて実感した

Actionsで設定するには下記

### 参考
- [Workflow syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#custom-shell)
- [GitHub Actions の shell option](https://zenn.dev/shunsuke_suzuki/scraps/172683d8bad652)

## まとめ

- Actions+Gitでマルチバイト文字を扱う場合は`core.auotepath`を設定する
- 基本的にpipefailを有効にする
