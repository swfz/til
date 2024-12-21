---
title: "tfenvを使いTerraformのバージョンを切り替える"
date: "2021-02-13"
description: "tfenv"
tags:
  - Terraform
---

[tfutils/tfenv: Terraform version manager](https://github.com/tfutils/tfenv)

Terraformのバージョンを切り替えて使用するためのツール

### インストール

```shell
$ git clone https://github.com/tfutils/tfenv.git ~/.tfenv
$ mkdir ~/.local/bin
$ ln -s ~/.tfenv/bin/* ~/.local/bin
```

### PATHへの追加

- .bashrc

```
export PATH="$HOME/.tfenv/bin:$PATH"
```

当たり前だが既存のパスより前にtfenvのパスが先にないと既存でterraformを使っている場合そっちが先に見つかってしまうのでtfenvのパスを先にする

### 切り替え、使用

```
$ tfenv install 0.14.6
$ tfenv use 0.14.6
$ terraform --version
Terraform v0.14.6
```
