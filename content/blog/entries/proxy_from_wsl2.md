---
title: "WSL2からホスト（Windows）上に立てたProxy経由で通信したい"
date: "2023-12-13"
description: "pproxy"
tags:
  - Proxy
  - WSL2
  - pproxy
  - Python
  - GitBash
---

諸般の事情によりWSLから外への通信をWSL以外の何かしらを経由して通信するという要件が発生した

WSL以外の何かしらにプロキシを設置する

Virtualboxでプロキシ用VMを起動するという選択肢が提示されたがそのためだけにVirtualBox起動するのはな…ということで、結局GitBashで`pproxy`を起動することにした

## Windows側

### Pythonのインストール

参考：[Windows PC へのPython3 導入手順 #Python - Qiita](https://qiita.com/Haruka-Ogawa/items/b37d0a2b48d14e29e802)

環境変数PATHにも追加チェックボックにチェックした

これでWindows側で`py.exe`が使えるようになるらしい

### pproxyのインストール

GitBashを入れているのでGitBashから下記実行した

```shell
$ py -m pip install pproxy
```

### pproxyの実行

```shell
$ py -m pproxy
Serving on :8080 by http,socks4,socks5
```

これだけでOKっぽい、簡単

カスタマイズしようと思えばいろいろできるみたいだが今回は不要だったのでこのまま

## WSL2側

### ホスト（Windows）側IPの特定

まずWindows側で立てたプロキシがどこかを判断する必要がある

```shell
$ ip route | grep 'default via' | awk '{print $3}'
172.1.1.1

$ ip route | grep 'default via' | grep --color=no -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
172.1.1.1
```

どちらかが良さそう

このIPがWSLから見えるホスト側のIPなのでこの場合`172.1.1.1:8080`をプロキシとして指定する

### httpでアクセス

```shell
$ curl -x http://172.1.1.1:8080 https://{proxyが必要なアクセス先URL}/
```

### ssh設定

プロキシを通したいホストに対して下記設定を追加

- ssh/config

```
ProxyCommand nc -X 5 -x 172.1.1.1:8080 %h %p
```

SOCKS5プロトコルでプロキシ通す設定

### SOCKS4,5の違い

そもそもSOCKS4,5は

Socket Secure version 4,5の略らしい

[SOCKS5プロキシのメリットとは？ | NordVPN](https://nordvpn.com/ja/blog/socks5-proxy-vpn/#:~:text=SOCKS5%E3%81%A8SOCKS4%E3%81%AE%E9%81%95%E3%81%84,%E3%81%8C%E8%A7%A3%E6%B1%BA%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)

> SOCKS5とSOCKS4はともにSOCKSプロトコルですが、SOCKS4は「UDP接続には利用できない」「プロキシ側に名前解決させることができない」「わずかな認証機能しかサポートしていない」という問題を抱えているのに対し、SOCKS5ではそれらの問題が解決されています。

基本的にSOCKS5を使ったほうが良さそう

### HTTPプロキシとSOCKSプロキシの違い

> HTTPプロキシはHTTPおよび [HTTPS](https://nordvpn.com/ja/blog/what-is-https/)ウェブページのみで動作するのに対し、SOCKS5プロキシはあらゆるトラフィックに対応しています。

> HTTPプロキシとは、通常、特定のプロトコル用に設計された高レベルのプロキシを指します。これにより接続速度は向上しますが、SOCKSプロキシほど柔軟性や安全性は高くありません。SOCKSプロキシはHTTPプロキシよりも低レベルで動作するため、あらゆるプログラムやプロトコル、あらゆるトラフィックを制限なく扱うことができます。
