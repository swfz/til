---
title: "Chrome拡張でOptionページの開き方"
date: "2024-12-04"
description: "openOptionsPage"
tags:
  - Chrome拡張
  - JavaScript
---

## Chrome拡張のオプションページを開く方法

通常はアイコンを右クリックすれば「オプション」項目があるのでそれをクリックしてオプションページへ遷移する

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
よくそういうことやっている拡張あると思うが
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

Chrome拡張の開発でpopupのページからリンクやボタンを用意して「クリックされたらオプションページへ遷移する」というのをやりたかった

- JavaScript

```javascript
chrome.runtime.openOptionsPage();
```

- tsx

```tsx
<button className="border p-4" onClick={() => chrome.runtime.openOptionsPage()}>Open Option</button>
```

オプションページを用意している前提だが、これでOK
