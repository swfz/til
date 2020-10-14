---
title: AnsibleでAWS CLI v2をインストールする
date: "2020-10-15"
description: ""
tags:
  - Ansible
  - AWS
---

dotfilesをAnsibleで管理していてAWS CLI v2もインストールできるようにroleを追加した

動作対象はCentOSやUbuntu

- roles/awscli/vars/main.yml

```yaml
---
awscli_version: 2.0.50
awscli:
  src: https://awscli.amazonaws.com/awscli-exe-linux-x86_64-{{ awscli_version }}.zip
  zip: awscli-{{ awscli_version }}.zip
```

- roles/awscli/tasks/main.yml

```yaml
---
- name: exist awscli v2
  command: which aws
  environment:
    PATH: "/usr/local/bin:{{ ansible_env.PATH }}"
  register: exist_awscli
  changed_when: false
  ignore_errors: true

- name: get awscli version
  shell: "aws --version 2>&1 | grep -oP '(?<=aws-cli\\/)\\d+\\.\\d+\\.\\d+' "
  environment:
    PATH: "/usr/local/bin:{{ ansible_env.PATH }}"
  register: version_in_awscli
  changed_when: false
  ignore_errors: true
  when:
    exist_awscli.rc == 0

- block:
  - name: get zip
    get_url:
      url: "{{ awscli.src }}"
      dest: "/tmp/{{ awscli.zip }}"

  - name: unarchive zip
    unarchive:
      src: /tmp/{{ awscli.zip }}
      dest: /tmp/
      copy: no

  - name: install
    command:
      cmd: ./aws/install --update
      chdir: /tmp

  when:
    exist_awscli.rc != 0
    or ( version_in_awscli is defined and version_in_awscli.stdout.find(awscli_version) == -1 )
```

ここのコードをroleとして呼び出せば実行できる

コマンドの存在確認だけでなくバージョンまで見て指定バージョンでなければ再度インストールするようにしている

このrole単体で使う場合は`unzip`がないはずなので別途どこかでインストールさせておく必要がある

`aws --version`の出力先が標準エラーだったのでリダイレクトしてバージョン番号を抽出している

また次のサイトでgrepを使い特定の箇所だけを抜き出すというのをやった

[grepの-oオプションと-Pオプションの組み合わせが便利 - Gre's Blog](http://greymd.hatenablog.com/entry/2014/09/27/154305)

こういう感じの処理はよくやるので覚えておきたい

実際の差分は次のPRにある

[Feature/ansible awscli v2 by swfz · Pull Request #222 · swfz/dotfiles](https://github.com/swfz/dotfiles/pull/222/files)
