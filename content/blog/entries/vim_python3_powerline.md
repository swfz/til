---
title: "Vim起動時のPowerlineのエラー"
date: "2020-11-08"
description: "--enable-pythoninterp"
tags:
  - Python
  - Vim
---

何かのタイミングでVimの起動時にエラーが出るようになってしまった

```
You need vim compiled with Python 2.6, 2.7 or 3.2 and later support
for Powerline to work. Please consult the documentation for more
details.
Press ENTER or type command to continue
```

`--enable-pythoninterp`つけてインストールし直したら解決した

```shell
git clone https://github.com/vim/vim.git /tmp/vim
cd /tmp/vim

./configure \
  --enable-fail-if-missing \
  --with-features=huge \
  --enable-gpm \
  --disable-selinux \
  --enable-perlinterp \
  --enable-pythoninterp \
  --enable-cscope \
  --enable-fontset \
  --enable-multibyte

make
make install
```