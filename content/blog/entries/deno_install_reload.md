---
title: "Denoでインストールしたモジュールのバージョンを更新する"
date: "2023-05-02"
description: "--reload"
tags:
  - Deno
---

何度インストールし直してもバージョンが変わらないなーと思ってたらキャッシュを参照していたっぽい

`--reload`すればOK

```shell
$ deno install --help
  -r, --reload[=<CACHE_BLOCKLIST>...]
          Reload source code cache (recompile TypeScript)
          --reload Reload everything
          --reload=https://deno.land/std
            Reload only standard modules
          --reload=https://deno.land/std/fs/utils.ts,https://deno.land/std/fmt/colors.ts
            Reloads specific modules
          --reload=npm:
            Reload all npm modules
          --reload=npm:chalk
            Reload specific npm module
  -f, --force
          Forcefully overwrite existing installation
```

手元でCLIツールを更新してみた

```shell
$ cg --version
cg v0.2.0

$ deno install -r -f --allow-env --allow-run --allow-net https://deno.land/x/commit_genius/cg.ts

$ cg --version
cg v0.3.0
```
