---
title: "NodeのDockerイメージでPuppeteerを使えるようにする"
date: "2021-07-28"
description: "色々パッケージが必要"
tags:
  - Node
  - Docker
  - Puppeteer
---

使用したイメージは`node:14.17.3`

普通にNodeのイメージにnpmインストールして実行するだけでOKだろうと思ったらそうは行かなかった

```
/home/user/project/node_modules/puppeteer/.local-chromium/linux-722234/chrome-linux/chrome: error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory
```

[ElectronをWindowsのBash(WSL)で試してみて成功しなかった - いがにんのぼやき](https://igatea.hatenablog.com/entry/2018/02/11/004142)

上記記事と似た感じだったので

`apt -y install  libx11-xcb-dev libxtst6 libxss1 libgconf-2-4 libnss3-dev libasound2`

をDockerfileに追加してPuppeteerを実行しようとしたがまだ足りなかった

動く様になるまでパッケージを追加していく

結果的には追加で下記2つのパッケージが必要だった

```
libatk-bridge2.0-0
libgtk-3-dev
```

おわり