---
title: "WSL2に移行した"
date: "2021-02-17"
description: "WSL"
tags:
  - WSL
  - Windows
---

下記参考にWSL→WSL2へ移行した際の記録

[Windows Subsystem for Linux (WSL) を Windows 10 にインストールする | Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10)

上記を参考に各種設定を行い次のコマンドを打ったが何も変わらず…

```
$ wsl --set-version Ubuntu 2
変換中です。この処理には数分かかることがあります...
WSL 2 との主な違いについては、https://aka.ms/wsl2 を参照してください
Windows の仮想マシン プラットフォーム機能を有効にして、BIOS で仮想化が有効になっていることを確認してください。
詳細については、https://aka.ms/wsl2-install を参照してください
```

```
$ wsl --list --verbose
  NAME                   STATE           VERSION
* Ubuntu                 Running         1
```

BIOSでの確認もしてみたが仮想化機能も有効になっていそう…

何度か一連の手順を踏んでみたが変わらず

最終的にはDockerForWindowsを入れてそちらの方で「仮想化機能をEnableにする」ダイアログをクリックして再起動したらWSL2側も使えるようになった

<!-- textlint-disable ja-hiragana-fukushi -->
というか仮想化機能自体が「Windowsの機能の有効化または無効化」の設定やPowershellのコマンドからだと正しくONにできなかったように見える
<!-- textlint-enable ja-hiragana-fukushi -->

もしくはほかにも設定変更をするべき項目が存在したか…

正直良くわからないが無事にWSL2+Dockerを使えるようになった

```
$ wsl --list --verbose
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop         Running         2
  docker-desktop-data    Running         2
```

`docker-desktop`も出力されるよう

以前から使っていたVagrant+VirtualBox（v6.1.16）のVMも問題なく起動して動かせたので良き

今までDockerを使うリポジトリは全部VMの中で開発していたがこれでWSL側でも開発できる