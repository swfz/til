---
title: "Kindle for PC(Windows)のショートカットを無効にする"
date: "2021-03-05"
description: "実はショートカットが2つあった"
tags:
  - Windows
---

## Kindle for PCのショートカットキー

デフォルトだと`Ctrl+Alt+k`でKindleが起動する

ショートカットキーを無効にするためにはショートカットのアイコンのプロパティから`ショートカット`欄を消すことで行える

自分はデスクトップにショートカットを置くようにしたのでそこだけ消せばOKだと思っていた

しかし、消してもまだ治らず

ディスク内で検索したら

```
C:\Users\hoge\Desktop
C:\Users\hoge\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Amazon\Amazon Kindle
```

2つ存在した!!!

`Start Menu`にも配置される模様…

両方解除することでショートカットが発動しないようになる

これに気付かずアプリケーションのアップデートのタイミングでショートカットが更新されてしまい毎度探すということをやっていたのでメモとして残しておく
