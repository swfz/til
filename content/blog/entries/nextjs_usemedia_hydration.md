---
title: "react-use/useMediaを使ったときのhydrationエラー対応"
date: "2022-09-27"
description: ""
tags:
  - React
  - Nextjs
  - TypeScript
  - JavaScript
---

Next.jsで、react-use/useMediaを使ってたらエラーがでた

- console

```
Warning: Prop `className` did not match. Server:
```

- 開発サーバ

```
`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.
```

ググってhydrationが失敗しているのはわかった

Hydrationについては下記がなるほどって感じだったので参考として貼っておく

- [(4) Reactである「Hydrate」って何でしょうか？ - Quora](https://jp.quora.com/React%E3%81%A7%E3%81%82%E3%82%8B-Hydrate-%E3%81%A3%E3%81%A6%E4%BD%95%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)

## 本来やりたかったこと

PCでの表示とモバイルでの表示で

- PCでのアクセス時はサイドメニュー表示状態
- モバイルでのアクセス時はサイドメニュー非表示状態

を実現したかった

この文脈ではPC=画面幅640px以上、モバイル=画面幅640px以下のことを指す

## 該当箇所のやっていたこと

該当箇所はサイドメニューのopen/closeを`useMedia`で得られる値をもとに実現していた

useMediaで640pxをしきい値にしてその値をサイドメニューのopen/closeに使う

具体的には次のようなコード

```tsx
import { useState, ReactNode, MouseEvent, useEffect } from 'react';
import { useMedia } from 'react-use';

.....
.....
  const isWide = useMedia('(min-width: 640px)');
  const [isOpen, setIsOpen] = useState(isWide);

  const togglOpen = (event: MouseEvent<SVGElement>) => {
    setIsOpen((prev) => !prev);
  };
.....
.....
.....
```

`isOpen`でメニューが開いている状態

## useMediaについて

useMediaについてGitHubを見に行くと

[react-use/useMedia.md at master · streamich/react-use](https://github.com/streamich/react-use/blob/master/docs/useMedia.md)

> defaultStateパラメータは、サーバーサイドレンダリングのフォールバックとしてのみ使用されます。
> サーバーサイドレンダリングでは、このパラメータを設定することが重要です。このパラメータを設定しないと、サーバーの初期状態が false にフォールバックしますが、クライアントはメディアクエリの結果で初期化されるからです。Reactがサーバレンダリングをハイドレートする際、クライアントの状態と一致しない場合があります。これがなぜ高価なバグにつながるかについては、Reactのドキュメントを参照してください

なるほどこれが原因でhydrationエラーが発生しているのかということはわかった

ドキュメント読んどけ案件…

が、デフォルト値を指定すると（false）PCモバイルどちらも同じ挙動になってしまう…

## 対策

具体的なコードで言うと下記のようにすることで対応した

```tsx
import { useState, ReactNode, MouseEvent, useEffect } from 'react';
import { useMedia } from 'react-use';

.....
.....
  const isWide = useMedia('(min-width: 640px)', false);
  const [isOpen, setIsOpen] = useState(isWide);

  useEffect(() => {
    setIsOpen(isWide);
  }, [isWide])

  const togglOpen = (event: MouseEvent<SVGElement>) => {
    setIsOpen((prev) => !prev);
  };
.....
.....
.....
```

差分は下記2つのPR

- [fix: Detects changes in useMedia hook and switches menu toggle by swfz · Pull Request #256 · swfz/tools](https://github.com/swfz/tools/pull/256/files)

- [fix: following hydration mismatch by swfz · Pull Request #255 · swfz/tools](https://github.com/swfz/tools/pull/255/files)

useMediaは`defaultState: false`でデフォルト値を指定、指定することでhydration時にはエラーが起きなくなる

<!-- textlint-disable ja-technical-writing/sentence-length -->
PCの場合（幅640px以上の場合）、クライアントサイドでレンダリングされた後にuseMediaで取得する`isWide`の値が変わるのでuseEffectで変更を検知して再レンダリングでメニューのopen/closeを反映するようにした…
<!-- textlint-enable ja-technical-writing/sentence-length -->

## おわり

最近本件以外でもReactを使っているプロジェクトでhydrationエラーが出て対応しないと…って感じでこの辺のしくみや流れを把握していないといけないの結構たいへんだな…

前提として知っておくべき知識が結構あるかもな…という感想を持ちました
