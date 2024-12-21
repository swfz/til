---
title: "ansible-lintの特定ルール除外方法"
date: "2022-02-25"
description: "id指定が非推奨になった"
tags:
  - Ansible
---

dotfilesのAnsibleでansible-lintを走らせているがいつの間にか失敗するようになっていたので少し調べた

エラー自体はルールが追加されたようだった

以前はID(`301`や`201`など)指定で除外していたがlintを実行しても結果にIDが見つからないのでソースを調べに行った

```yaml
- name: "hoeg" # noqa 301
```

下記コメントにIDでの指定が非推奨というコメントを発見した

[ansible-lint/constants.py at main · ansible-community/ansible-lint](https://github.com/ansible-community/ansible-lint/blob/main/src/ansiblelint/constants.py)

今後は名前で指定していくよう

```diff
-- name: install diff-so-fancy # noqa 301
+- name: install diff-so-fancy # noqa no-changed-when
```

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
このほうがわかりやすいので良いと思います
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

IDでの除外指定も試してみたらまだID指定でも除外できるようなのですぐ影響はないが変えておくと良さそう

ちなみに、デフォルトのルールは下記から探すことができる

[Default Rules — Ansible Lint Documentation](https://ansible-lint.readthedocs.io/en/latest/default_rules.html)