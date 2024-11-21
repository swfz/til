---
title: "CSSで見えない要素を指定する"
date: "2024-11-21"
description: "visiblity"
tags:
  - CSS
---

document picture in pictureのときだけ特定要素を表示させるというのをしたかった

- 参考

[「動画」だけでなく、すべての要素でピクチャー イン ピクチャーで使用可能  |  Web Platform  |  Chrome for Developers](https://developer.chrome.com/docs/web-platform/document-picture-in-picture?hl=ja)

- document picture in pictureの一部コード

```typescript
 const content = document.querySelector('#dpinp');
 const pipWindow = await documentPictureInPicture.requestWindow({
   width: content?.clientWidth,
   height: content?.clientHeight,
   copyStyleSheets: true,
 });
 pipWindow.document.body.append(content);
```

```tsx
<div id="dpinp">
  <div>
    <div>コンテンツ</div>
    <meter min={0} max={10} value={3}></meter>
    <div>
      <button id="pause-button">
        <PauseIcon />
      </button>
    </div>
  </div>
</div>
```

見た目のため簡略化したが`pause-button`をdocument picture in picture時は表示、通常時は非表示にさせたい

参考にあるようにdocument picture in picture時のスタイルはメディアクエリで指定できるのでそちらでやる

通常時の状態では非表示要素で用意しておきたい

Tailwind CSSを利用していたのでいつものように`hidden`かな?と思い`content`の中のタグにスタイルを設定した

[Display - Tailwind CSS](https://tailwindcss.com/docs/display)

- hidden

```
display: none;
```

- contents

```
display: contents;
```

が、pinpウィンドウのサイズを指定する際に、対象要素を表示するしないで`clientHeight`が変わってしまうようだった、なのでpinp対象の要素と同じサイズにならない

そういうケースには`visiblity`というプロパティを使えば良いらしい

調べたらすぐ出てきたが知らなかった

- visible
```
visibility: visible;
```

- invisible
```
visiblity: hidden;
```

[Visibility - Tailwind CSS](https://tailwindcss.com/docs/visibility)

「要素を「見えない状態」にしますが、DOM上のレイアウトには影響を与えません」とのこと

これだよこれ

しらなかった

- component.tsx

```tsx
<div id="dpinp">
  <div>
    <div>コンテンツ</div>
    <meter min={0} max={10} value={3}></meter>
    <div>
      <button id="pause-button" className="invisible">
        <PauseIcon />
      </button>
    </div>
  </div>
</div>
```

- styles/tailwind.css

```css
@media all and (display-mode: picture-in-picture) {
  #pause-button {
    @apply visible;
  }
}
```

通常時は`invisible`、picture in picture時は`visible`

これは良き
