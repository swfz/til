---
title: "Python環境でencode系のエラーが出たときの対応例"
date: "2021-08-16"
description: "大体UTF-8"
tags:
  - Python
  - pip
---

Dockerコンテナのビルド時に`pip3 install ansible ansible-lint yamllint`コマンド実行時、次のようなエラーが出た

```
ERROR: Exception:
Traceback (most recent call last):
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/cli/base_command.py", line 173, in _main
    status = self.run(options, args)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/cli/req_command.py", line 203, in wrapper
    return func(self, options, args)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/commands/install.py", line 316, in run
    reqs, check_supported_wheels=not options.target_dir
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/resolver.py", line 95, in resolve
    collected.requirements, max_rounds=try_to_avoid_resolution_too_deep
  File "/usr/local/lib/python3.6/site-packages/pip/_vendor/resolvelib/resolvers.py", line 472, in resolve
    state = resolution.resolve(requirements, max_rounds=max_rounds)
  File "/usr/local/lib/python3.6/site-packages/pip/_vendor/resolvelib/resolvers.py", line 366, in resolve
    failure_causes = self._attempt_to_pin_criterion(name)
  File "/usr/local/lib/python3.6/site-packages/pip/_vendor/resolvelib/resolvers.py", line 212, in _attempt_to_pin_criterion
    criteria = self._get_updated_criteria(candidate)
  File "/usr/local/lib/python3.6/site-packages/pip/_vendor/resolvelib/resolvers.py", line 203, in _get_updated_criteria
    self._add_to_criteria(criteria, requirement, parent=candidate)
  File "/usr/local/lib/python3.6/site-packages/pip/_vendor/resolvelib/resolvers.py", line 172, in _add_to_criteria
    if not criterion.candidates:
  File "/usr/local/lib/python3.6/site-packages/pip/_vendor/resolvelib/structs.py", line 151, in __bool__
    return bool(self._sequence)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/found_candidates.py", line 140, in __bool__
    return any(self)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/found_candidates.py", line 128, in <genexpr>
    return (c for c in iterator if id(c) not in self._incompatible_ids)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/found_candidates.py", line 32, in _iter_built
    candidate = func()
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/factory.py", line 209, in _make_candidate_from_link
    version=version,
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/candidates.py", line 301, in __init__
    version=version,
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/candidates.py", line 156, in __init__
    self.dist = self._prepare()
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/candidates.py", line 227, in _prepare
    dist = self._prepare_distribution()
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/resolution/resolvelib/candidates.py", line 306, in _prepare_distribution
    self._ireq, parallel_builds=True
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/operations/prepare.py", line 508, in prepare_linked_requirement
    return self._prepare_linked_requirement(req, parallel_builds)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/operations/prepare.py", line 552, in _prepare_linked_requirement
    self.download_dir, hashes
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/operations/prepare.py", line 249, in unpack_url
    unpack_file(file.path, location, file.content_type)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/utils/unpacking.py", line 256, in unpack_file
    untar_file(filename, location)
  File "/usr/local/lib/python3.6/site-packages/pip/_internal/utils/unpacking.py", line 226, in untar_file
    with open(path, "wb") as destfp:
UnicodeEncodeError: 'ascii' codec can't encode character '\xe9' in position 117: ordinal not in range(128)
Service 'centos' failed to build : The command '/bin/sh -c pip3 install ansible ansible-lint yamllint' returned a non-zero code: 2
```

encoding指定が必要な模様

PYTHONENCODINGで文字コード指定するという記事もあったがそちらの方法ではうまく行かず…

次の記事を参考に環境変数を指定するようにした

[PythonのUnicodeDecodeErrorの対処方法 - Python入門](https://kaworu.jpn.org/python/Python%E3%81%AEUnicodeDecodeError%E3%81%AE%E5%AF%BE%E5%87%A6%E6%96%B9%E6%B3%95)

```
LC_ALL=en_US.UTF-8 pip3 install ansible ansible-lint yamllint
```

で無事ビルドできるようになった
