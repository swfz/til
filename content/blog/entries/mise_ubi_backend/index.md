---
title: "miseのubi backend"
date: "2024-12-19"
description: ""
tags:
  - mise
  - Command
---

miseのbackend機能のひとつ

[Backends | mise-en-place](https://mise.jdx.dev/dev-tools/backends/)

pipxとかnpmとかもある、本来であれば`npm install`だったり`pipx install`を挟むべきものをmiseの設定ファイルに記述すればやってくれるというもの

pipやnpmなどでコマンドラインツールを提供してたりするものならbackend機能でインストールできる

goやcargo,gemもあるのでまぁほぼなんでも入れられるよなって感じ

その中にubi backendがあった

ubiについては[Universal Binary Installer](https://til.swfz.io//entries/universal_binary_installer/)に書いた

- mise.config.toml

```
[tools]
"ubi:duckdb/duckdb" = 'latest'
```

これを書いた時点ではDuckDBはmiseのregistory.tomlには入っていなかったのでubiバックエンドでインストールする

- install

```
$ mise i  
mise Installed binary into /home/user/.local/share/mise/installs/ubi-duckdb-duckdb/1.1.3/bin/duckdb  
mise ubi:duckdb/duckdb@1.1.3 ✓ installed
```

- 確認

```
$ duckdb --version  
v1.1.3 19864453f7
```

楽すぎる…

指定方法は`owner/repo`

ubiコマンドで指定する方法と同様

バージョン指定する場合も同様かな

これ楽すぎるな

最初おためしで使ってみるときはubiバックエンドでインストールしておきつつ、本家の`registory.toml`になければコントリビュートチャンス!

というかバックエンド機能があるからかなりの範囲のツールをカバーできるよな…って感じた
