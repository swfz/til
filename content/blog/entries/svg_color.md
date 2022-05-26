---
title: "SVG iconに色を付ける"
date: "2022-05-25"
description: "filterプロパティ"
tags:
  - SVG
  - CSS
---

<!-- textlint-disable prh -->
ページ中に表示したSVNのアイコンに対して、色をつけたいというケースがあった
<!-- textlint-enable prh -->

とりあえずcolorプロパティを変更しても反映されなかったため、調べたら

filterプロパティというものがありそれを適切に設定すると色を付けることが可能だった

```html
<img src="hoge.svg" class="red">
```

```css
.red {
  filter: invert(13%) sepia(94%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(115%);
}
```

個々で指定している数値はRGBから変換できるとうれしいなと思っていたら

下記のようなページで変換するのが良さそう

[CSS Color Filter Generator](https://angel-rs.github.io/css-color-filter-generator/)
