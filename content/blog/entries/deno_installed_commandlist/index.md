---
title: "denoでインストールしたコマンドのリストを見たい"
date: "2025-01-12"
description: ""
tags:
  - Deno
---

コマンドはなさそうだった

helpを見ると次のような記述があった

```bash
$ deno install -h
.....
.....
.....
.....
The installation root is determined, in order of precedence:
  - --root option
  - DENO_INSTALL_ROOT environment variable
  - $HOME/.deno
```

この順序で指定のあるディレクトリに保存される

```bash
$ echo $DENO_INSTALL_ROOT
/home/user/.local/share/mise/installs/deno/2.0.6/.deno

$ echo $HOME
/home/user
```

自分の環境だと`DENO_INSTALL_ROOT`に指定があった

miseを使っているのでそこで設定されているみたい

Denoのバージョンが上がるとディレクトリも変わるので`command not found`となる

なのでDenoのバージョンが上がればインストールし直すって感じか

## コマンドリストの確認

指定があったディレクトリの`bin`ディレクトリを見にいけば良い

```bash
ls ~/.local/share/mise/installs/deno/*/.deno/bin
/home/user/.local/share/mise/installs/deno/2.0.6/.deno/bin:
deployctl*  logviewer*

/home/user/.local/share/mise/installs/deno/2.0/.deno/bin:
deployctl*  logviewer*

/home/user/.local/share/mise/installs/deno/2/.deno/bin:
deployctl*  logviewer*

/home/user/.local/share/mise/installs/deno/latest/.deno/bin:
deployctl*  logviewer*
```

全バージョンでのリスト

現状使っているDenoバージョンでのコマンドリストを見たい場合は

```bash
ls $DENO_INSTALL_ROOT/bin
```
で良い

### 蛇足

miseの仕様っぽいが、`latest`,`2`,`2.0`は`2.0.6`へのシンボリックリンクだった

そして過去にインストールしたバージョンのコマンドも見ることができるかと思っていたができなかった

古いバージョンのディレクトリはmiseにより削除されている模様

- miseのバージョン

```bash
mise -v
2024.11.37 linux-x64 (7ac5ab3 2024-11-30)
```

まぁ必要なものだけ入れ直してねって話ではあるけど、`upgrade`まえに確認はしておきたいやつ

## 環境変数指定がない場合

```bash
ls $HOME/.deno/bin
```
