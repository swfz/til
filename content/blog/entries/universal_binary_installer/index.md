---
title: "Universal Binary Installer"
date: "2024-12-03"
description: "ubi"
tags:
  - Command
  - mise
---

[houseabsolute/ubi: The Universal Binary Installer](https://github.com/houseabsolute/ubi)

miseの内部で使っているパッケージマネージャーの中で、`asdf`のほかに`ubi`という文字列を見つけて何のことか気になったので調べてみた

簡単に言うと現環境に適切なバイナリを判断してGitHub Releasesからインストールしてくれるくん

最近だとGoやRustで作られたコマンドは各種OSやアーキテクチャ用にバイナリをビルドしてGitHubのReleasesにおいてくれているところが多い（ように感じる）

バイナリ持ってくるだけだからその時点で結構楽ではあるが、ubiは`org/repo`を指定するだけで持ってこれますよっていう感じ

## インストール

```bash
$ curl --silent --location \
    https://raw.githubusercontent.com/houseabsolute/ubi/master/bootstrap/bootstrap-ubi.sh |
    sh
```

`$HOME/bin`にインストールされる

```bash
$ ls bin
ubi
```

### option

2つだけピック

`-p --project`がリポジトリ

`--tag`指定もあるのでバージョン指定も可能

### 試しにvividを入れてみる

```bash
$ ./bin/ubi --project sharkdp/vivid
```


```bash
$ ls bin
ubi vivid
```

インストールできた

```bash
$ ./bin/vivid
error: 'vivid' requires a subcommand but one was not provided
  [subcommands: generate, preview, themes, help]

Usage: vivid [OPTIONS] <COMMAND>

For more information, try '--help'.
```

簡単


## miseでの利用

mise内部でubiを使っているようだが、そもそもubiをmise管理化においてubiコマンドを使うことも可能

- mise.config.toml

```
[tools]
ubi = 'latest'
```

自分はこの方法にした

何か試したいツールが発生したらとりあえずubiでインストールしてみて良さそうであればmise管理移行、なければPR作るみたいな流れができる

その流れでmiseへ`vivid`コマンドを管理できるようPRを作った

[feat: add vivid by swfz · Pull Request #3089 · jdx/mise](https://github.com/jdx/mise/pull/3089)

現時点だとかなりmiseの開発が活発で数時間でマージしてくれてスピード感すごかった

## おわり

一昔前は何かインストールするにもビルドが必要、ビルドがコケていろいろ調べて解決してたらかなり時間使ってしまったみたいなことが結構あった

最近はそういうのがなくなってきている

よい時代になったものだなぁ
