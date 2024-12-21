---
title: "Ansibleでsystemdの設定を一部変更して反映させる"
date: "2021-01-15"
description: "daemon_reload"
tags:
  - Ansible
  - AWS
---

AnsibleでCloudWatchAgentのデーモンを起動する処理を書いていてsystemdの設定ファイルを少しだけいじりたいパターンがあったのでそのメモ

なお今回はamazon-linux2を想定している

具体的には

`Restart=on-failure` から `Restart=always`へ変更するだけ

ファイルの中身を一部書き換えるのはAnsibleの`lineinfile`モジュールで行える

config.json.j2は適当なテンプレートを用意する

- tasks/main.yml

```yaml
- name: Install agent
  yum:
    name:
      - amazon-cloudwatch-agent
    state: present

- name: collectd exist
  stat:
    path: /usr/share/collectd/types.db
  register: collectd_exist

- name: install collectd
  command: amazon-linux-extras install -y collectd
  when: not collectd_exist.stat.exists

- name: systemd configuration restart always
  lineinfile:
    path: /etc/systemd/system/amazon-cloudwatch-agent.service
    regexp: '^Restart='
    line: 'Restart=always'
  notify: systemd reload

- name: set config file
  template:
    src: config.json.j2
    dest: /opt/aws/amazon-cloudwatch-agent/bin/config.json
    mode: 0644
  notify: Restart cloudwatch agent
```

- handlers/main.yml

```yaml
---
- name: Restart cloudwatch agent
  command: /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json

- name: systemd reload
  systemd:
    name: amazon-cloudwatch-agent
    daemon_reload: yes
```

lineinefileで変更があればdaemon-reloadすることでsystemdの設定を読み込み直してくれる

参考

- [ansible.builtin.lineinfile – Manage lines in text files — Ansible Documentation](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html)

- [[Ansible] lineinfile モジュールの基本的な使い方（テキストファイルの行単位の編集） - てくなべ (tekunabe)](https://tekunabe.hatenablog.jp/entry/2019/02/24/ansible_lineinfile_intro)