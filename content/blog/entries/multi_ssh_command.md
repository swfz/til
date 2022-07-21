---
title: 多段SSHをワンライナーで行う
date: "2020-06-20"
description: "ssh -o ProxyCommand"
tags:
  - ssh
  - ワンライナー
  - ShellScript
---

## Step Server

- x.x.x.x

## VPC内のEC2

- 10.0.1.2

```
ssh -i ~/.ssh/hoge.pem  ec2-user@10.0.1.2 -o ProxyCommand='ssh -i ~/.ssh/hoge.pem -W %h:%p ec2-user@x.x.x.x'
```