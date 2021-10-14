---
title: "VS Code Remote WSLが起動しない"
date: "2021-10-14"
description: "デフォルトのディストリビューション設定"
tags:
  - WSL
  - VS Code
---

PCをセットアップし直してWSLも入れ直していざVS Codeを起動したらWSLに接続できなかった

- エラーログ

```
[2021-10-08 17:49:31.526] Resolving wsl+Ubuntu, resolveAttempt: 1
[2021-10-08 17:49:31.649] Starting VS Code Server inside WSL (Ubuntu)
[2021-10-08 17:49:31.649] Extension version: 0.58.2, Windows build: 19041. Multi distro support: available. WSL path support: enabled
[2021-10-08 17:49:31.650] No shell environment set or found for current distro.
[2021-10-08 17:49:31.887] Probing if server is already installed: C:\Windows\System32\wsl.exe -d Ubuntu -e sh -c "[ -d ~/.vscode-server/bin/69755771804a4f5097277cbbb50dff67 ] && printf found || ([ -f /etc/alpine-release ] && printf alpine-; uname -m)"
[2021-10-08 17:49:32.000] Unable to detect if server is already installed: Error: Command failed: C:\Windows\System32\wsl.exe -d Ubuntu -e sh -c "[ -d ~/.vscode-server/bin/69755771804a4f5097277cbbb50dff67 ] && printf found || ([ -f /etc/alpine-release ] && printf alpine-; uname -m)"
[2021-10-08 17:49:32.000] 指定されたファイルが見つかりません。
[2021-10-08 17:49:32.000] 
[2021-10-08 17:49:32.001] Launching C:\Windows\System32\wsl.exe -d Ubuntu sh -c '"$VSCODE_WSL_EXT_LOCATION/scripts/wslServer.sh" 69755771804a4f5097277cbbb50dff67 stable .vscode-server 0  '}
[2021-10-08 17:49:32.080] 
[2021-10-08 17:49:32.081] VS Code Server for WSL closed unexpectedly.
[2021-10-08 17:49:32.082] For help with startup problems, go to
[2021-10-08 17:49:32.082] https://code.visualstudio.com/docs/remote/troubleshooting#_wsl-tips
[2021-10-08 17:49:32.102] WSL Daemon exited with code 0
```

<!-- textlint-disable prh -->
一部文字化けしていたので該当箇所は削除した
<!-- textlint-enable prh -->

使用しているWSLのディストリビューションがデフォルトでなくなってしまっていた模様

[Developing in the Windows Subsystem for Linux with Visual Studio Code](https://code.visualstudio.com/docs/remote/wsl#_why-am-i-asked-to-change-the-default-distro)

現在使っているのは`Ubuntu-20.04`

確認してみる

```shell
> wslconfig /l
Linux 用 Windows サブシステム ディストリビューション:
Ubuntu (既定)
docker-desktop
Ubuntu-20.04
docker-desktop-data

> wslconfig /setdefault Ubuntu-20.04

> wslconfig /l
Linux 用 Windows サブシステム ディストリビューション:
Ubuntu-20.04 (既定)
Ubuntu
docker-desktop
docker-desktop-data
```

`Ubuntu`のディストリビューションはPC移行以前に使っていたが新しいPCにWSLのデータを移行できなかったので起動できなかったと推測できる

VS CodeのRemote WSLではデフォルトのディストリビューションに接続する仕様なのでホスト側でデフォルトのWSLのディストリビューションを決めてあげる必要がある

無事VS CodeでRemoteWSL拡張が使えるようになった