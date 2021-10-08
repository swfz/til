---
title: "Windows TerminalでWSL(Ubuntu)の初期ディレクトリの指定"
date: "2021-10-09"
description: "~"
tags:
  - WSL
  - Windows Terminal
---

WSLでデフォルトのディレクトリ指定をする

- 書いた時点での環境

```
Windows Terminal(Preview): 1.8.1032.0
```

WSLのprofile設定の中のcommandlineで`~`を指定すればOK

`wsl.exe`の後に開始ディレクトリを指定できる

```json
{
  "commandline": "wsl.exe ~ -d Ubuntu-20.04",
  "startingDirectory": null
}
```

`~`なしだとWindowsTerminal側の設定が有効になるのかな

上記設定だと`親プロセスディレクトリの使用`にチェックが付き、自分の環境だとWindows側のディレクトリになった`/mnt/c/Windows/System32`

これで解決！

- 参考
[Windows Terminalをカスタマイズしよう！(v1.0.1401.0版) - Qiita](https://qiita.com/hideki0145/items/04582a26baf3d81632c1)