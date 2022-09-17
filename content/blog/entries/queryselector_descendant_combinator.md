---
title: querySelectorで対象要素以下の要素を取得する
date: "2022-09-16"
description: ""
tags:
  - QuerySelector
  - JavaScript
---

XPathでいう`div//span`のような指定方法

直下の子要素を指定する`>`しか知らなかったが下記のようにスペース区切りにするだけで孫要素以下も含めた子要素を対象にできる

[子孫結合子 - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Descendant_combinator)

ということでXPathでの`div//span`をquerySelectorで表すと`div span`でOK

ちなみにXPathでの`div/span`がquerySelectorでは`div > span`にあたる

