---
title: "CSS Keyframesでのアニメーションとアニメーション後の処理"
date: "2024-12-11"
description: "Keyframe + animationend"
tags:
  - CSS
  - JavaScript
---

Chrome拡張で画面上にテキストを流す処理を書いていた

テキストを流す処理自体はCSSのKeyframeでサクッと実現できたがアニメーションしたあとは消したい（非表示にさせたい）

## @keyframes

[@keyframes - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@keyframes)

開始（from）から終了（to）、または中間の地点（`50%`など）それぞれにスタイルを定義し、アニメーションにする

## KeyframesによるCSSアニメーション

### アニメーション定義

右端見えないところから左へX座標を-150vh分までずらす

```css
@keyframes slideLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-150vw);
  }
}
```

- styleの指定

```javascript
const element = document.createElement("div");
element.innerText = "test"
element.style.right = "-30%"
element.style.animation = "slideLeft 4s linear"
```

初期位置が右端から`-30%`の位置

### 指定方法

[animation - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

種類がたくさんある、バリエーションを調べるにはドキュメントを読むのが一番早い

あとはGPTに聞くなりで使えれば良いかな…

今回は`animation: ${Keyframesで定義した名前} ${アニメーションの実行時間は4秒} ${一定速度でアニメーションを実行}`という感じで指定した

## JavaScript側

### animationend

[Element: animationend イベント - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Element/animationend_event)

CSSアニメーションが完了したときに発生するイベント

イベントのコールバックを指定できる

```javascript
const element = document.createElement("div");
element.innerText = "test"
element.style.right = "-30%"
element.style.animation = "slideLeft 4s linear"
element.onanimationend = (e) => {
  const slideLeftElement = e.target as HTMLParagraphElement
  slideLeftElement.style.display = `none`
}
```

アニメーションが終了したら`display: none`になる

これがないと、初期位置に要素が残ったままになってしまう、今回の仕様だとスクロールが必要な感じになってしまう

`animation-fill-mode`でもできそうかな?と思ったけど読んでみたらやりたいこととは違いそうだった

なにはともあれこれで「テキストを流してそのあと非表示にさせる」を実現できた

JavaScriptで座標を計算して移動RequestAnimationframeでアニメーションさせるという方法もあるが、こういうのはCSSに任せられたほうが全体としてスッキリするかなと感じている


