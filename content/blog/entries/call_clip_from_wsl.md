---
title: "WSL2でクリップボードへコピーする"
date: "2022-03-19"
description: "Windows側の実行ファイルを直接呼ぶ"
tags:
  - WSL2
---

WSLであれば直接Windows側の`exe`をたたけるので`/mnt/c/...`という形で直接たたける

適当にaliasに設定する（実行ファイルの場所は環境に合わせて記載する）

```
alias clip='/mnt/c/WINDOWS/system32/clip.exe'
alias explorer='/mnt/c/Windows/explorer.exe'
```

自分の環境だと上記だった

それぞれ

- クリップボードへコピー
- Explorerを開く

に対応している

たとえば、何かしらのコマンドの結果をクリップボードに直接コピーするといった感じの使い方ができる

```
$ sh hoge.sh | clip
```

地味に便利

クリップボードの話だけで言うとXを使って連携する方法もあるようだが常にXを起動しておくのもなーと思いこの方法を取っている

今のところ不便はしていない