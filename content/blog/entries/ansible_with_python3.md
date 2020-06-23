---
title: Python3でAnsibleを実行する際のエラー対応
date: "2020-06-24"
description: "has_key"
tags:
  - Ansible
  - Python
---

なんとなくAnsibleの実行環境をPython3にして実行してみたら見事エラーで死亡したのでその際の対応ログ

```
fatal: [localhost]: FAILED! => {"msg": "The conditional check 'ansible_env.has_key('CI') and ansible_env.CI != \"true\"' failed. The error was: error while evaluating conditional (ansible_env.has_key('CI') and ansible_env.CI != \"true\"): 'dict object' has no attribute 'has_key'\n\nThe error appears to be in '/usr/local/src/ansible/roles/common/tasks/redhat.yml': line 63, column 3, but may\nbe elsewhere in the file depending on the exact syntax problem.\n\nThe offending line appears to be:\n\n\n- name: disable SELinux\n  ^ here\n"}
```

has_keyがない

ということで

Python3での実行に対応するには

```diff
- ansible_env.has_key('CI')
+ 'CI' in ansible_env
```

もしくは

```diff
- ansible_env.has_key('CI')
+ ansible_env.get('CI', None)
```

の対応が必要

