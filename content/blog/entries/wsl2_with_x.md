---
title: "WSL2でXLaunchを使ってGUIアプリを起動する"
date: "2021-05-24"
description: "動的なDISPLAY設定とX側の設定が必要"
tags:
  - WSL2
  - X
---

## WSL側

DISPLAY環境変数をセットする

```shell
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0 
```

WSLの起動ごとにIPが変わるらしいのでこんな感じの処理を毎度読ませないといけないよう

## Xlaunch

`additional parameter`の項目に`-ac`を追加

## WSL側

```
xeyes
```

これで無事起動できた

### 参考：
- [WSL2におけるVcXsrvの設定 - Qiita](https://qiita.com/ryoi084/items/0dff11134592d0bb895c)
- [WSL2＋Ubuntu 20.04でGUIアプリを動かす | AsTechLog](https://astherier.com/blog/2020/08/run-gui-apps-on-wsl2/)
