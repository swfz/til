---
title: "CentOS7でAnsible実行時にCERTIFICATE_VERIFY_FAILED"
date: "2021-11-10"
description: "ca-certificateを更新"
tags:
  - Ansible
  - CentOS7
  - Python
---

CentOS7のイメージ中でAnsibleを使って`get_url`でGitをソースからインストールしている処理があったがそこで問題が発生していた

```
fatal: [localhost]: FAILED! => {"changed": false, "dest": "/tmp/git-2.33.0.tar.gz", "elapsed": 0, "msg": "Request failed: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)>", "url": "https://www.kernel.org/pub/software/scm/git/git-2.33.0.tar.gz"}
```

証明書関連かーというのはすぐ分かるが、じゃどうすれば良いのってことで

Ansibleだとrequestsかcertificateモジュールを更新すればよいのかと思って更新してみたものの解決されず

証明書リストを追加すればOK?みたいな感じで探していたら次の記事に助けられた

[Let's EncryptのルートCA期限切れで OpenSSL 1.0.2が思わぬ事故を起こす件 | ワルブリックス株式会社](https://www.walbrix.co.jp/article/openssl-102-letsencrypt-crisis.html)

`www.kernel.org`を見に行ったらLet's Encryptと`ISRG Root X1`の組み合わせだった

最新のOSバージョンでは解決しているとのことだったので今一度更新してから試そうとしてみた

dockerでイメージビルドするときは最新を指定してたはずなのでどうかなと思ったもののいったん`yum update`で更新して試してみた

```
$ yum update
===============================================================================================================================================================================
 Package                                       Arch                              Version                                              Repository                          Size
===============================================================================================================================================================================
Updating:
 bind-license                                  noarch                            32:9.11.4-26.P2.el7_9.7                              updates                             91 k
 ca-certificates                               noarch                            2021.2.50-72.el7_9                                   updates                            379 k
 centos-release                                x86_64                            7-9.2009.1.el7.centos                                updates                             27 k
 coreutils                                     x86_64                            8.22-24.el7_9.2                                      updates                            3.3 M
 device-mapper                                 x86_64                            7:1.02.170-6.el7_9.5                                 updates                            297 k
 device-mapper-libs                            x86_64                            7:1.02.170-6.el7_9.5                                 updates                            325 k
 epel-release                                  noarch                            7-14                                                 epel                                15 k
 glib2                                         x86_64                            2.56.1-9.el7_9                                       updates                            2.5 M
 glibc                                         x86_64                            2.17-325.el7_9                                       updates                            3.6 M
 glibc-common                                  x86_64                            2.17-325.el7_9                                       updates                             12 M
 glibc-devel                                   x86_64                            2.17-325.el7_9                                       updates                            1.1 M
 glibc-headers                                 x86_64                            2.17-325.el7_9                                       updates                            691 k
 kernel-headers                                x86_64                            3.10.0-1160.45.1.el7                                 updates                            9.0 M
 kpartx                                        x86_64                            0.4.9-135.el7_9                                      updates                             81 k
 libblkid                                      x86_64                            2.23.2-65.el7_9.1                                    updates                            183 k
 libmount                                      x86_64                            2.23.2-65.el7_9.1                                    updates                            185 k
 libsmartcols                                  x86_64                            2.23.2-65.el7_9.1                                    updates                            143 k
 libuuid                                       x86_64                            2.23.2-65.el7_9.1                                    updates                             84 k
 nspr                                          x86_64                            4.32.0-1.el7_9                                       updates                            127 k
 nss                                           x86_64                            3.67.0-3.el7_9                                       updates                            882 k
 nss-softokn                                   x86_64                            3.67.0-3.el7_9                                       updates                            358 k
 nss-softokn-freebl                            x86_64                            3.67.0-3.el7_9                                       updates                            337 k
 nss-sysinit                                   x86_64                            3.67.0-3.el7_9                                       updates                             66 k
 nss-tools                                     x86_64                            3.67.0-3.el7_9                                       updates                            549 k
 nss-util                                      x86_64                            3.67.0-1.el7_9                                       updates                             79 k
 openldap                                      x86_64                            2.4.44-24.el7_9                                      updates                            356 k
 python                                        x86_64                            2.7.5-90.el7                                         updates                             96 k
 python-libs                                   x86_64                            2.7.5-90.el7                                         updates                            5.6 M
 rpm                                           x86_64                            4.11.3-46.el7_9                                      updates                            1.2 M
 rpm-build-libs                                x86_64                            4.11.3-46.el7_9                                      updates                            108 k
 rpm-libs                                      x86_64                            4.11.3-46.el7_9                                      updates                            279 k
 rpm-python                                    x86_64                            4.11.3-46.el7_9                                      updates                             84 k
 sudo                                          x86_64                            1.8.23-10.el7_9.2                                    updates                            843 k
 systemd                                       x86_64                            219-78.el7_9.3                                       updates                            5.1 M
 systemd-libs                                  x86_64                            219-78.el7_9.3                                       updates                            418 k
 tzdata                                        noarch                            2021c-1.el7                                          updates                            502 k
 util-linux                                    x86_64                            2.23.2-65.el7_9.1                                    updates                            2.0 M
 vim-minimal                                   x86_64                            2:7.4.629-8.el7_9                                    updates                            443 k

Transaction Summary
===============================================================================================================================================================================
Upgrade  38 Packages
```

このあとでのansible実行は問題なく実行できた

ということでこの中のどれかのパッケージを更新すれば問題なさそうという感じ

`ca-certificates`かな?CA証明書のリスト

ということで`ca-certificates`のみlatestにするようなAnsibleを書いて再実行したところ無事成功した

※参考の記事中にもよく読んだら`ca-certificate`パッケージを上げると書いてあった

パッケージすべてlatestだと勝手に更新されて失敗してしまったりしたら困るよねっていう認識だったが逆にlatestのほうが良いものもあるんだなというのが今回の気付きでした

最近ちょいちょいこのパータンにはまっている気がするので残しておく