---
title: WindowsのエクスプローラからWSLなどのファイルを扱う
date: "2020-07-30"
description: ""
tags:
  - Windows
  - WSL
---

Windows <-> WSL間でのファイルのやりとり

## Windows -> WSL上ファイルへのアクセス

エクスプローラで`\\wsl$`と入力するとファイル群を閲覧できる

## Windows -> VM + sambaへのアクセス

エクスプローラで`\\192.168.30.11\...`と入力するとファイル群を閲覧できる

## WSL -> Windows上ファイルへのアクセス

Windows上のファイルへのアクセスは次のように行う

```shell
ls /mnt/c/Users/.....
```