---
title: "deno installでGitHub上のスクリプトを指定する"
date: "2024-09-19"
description: ""
tags:
- Deno
- GitHub
---

ただ単にGitHub上でファイル開いてURLコピーしてそれをインストールするという感じではなかった

下記Issueでも話題になっているが

[How to import module from Github · Issue #5543 · denoland/deno](https://github.com/denoland/deno/issues/5543)

## フォーマット

`https://github.com/{username}/{reponame}/raw/{branch}/{filepath}`

### 例

`https://github.com/swfz/deno-kv-logviewer/blob/main/logviewer.ts`で表示されるスクリプトをインストールする場合


```bash
deno install --allow-net --allow-env --unstable-kv https://github.com/swfz/deno-kv-logviewer/raw/main/logviewer.ts
```

で使えるようになる