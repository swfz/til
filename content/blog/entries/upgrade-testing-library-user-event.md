---
title: "testing-library-user-eventの更新13.5 to 14"
date: "2022-04-14"
description: "公式ドキュメント読む"
tags:
  - React
  - TestingLibrary
---

RenovateのPRで本ブログのリポジトリのテストがこけていた

参考にはならなそうだが一応ログ残しておく

```
 FAIL  src/components/__tests__/archive.tsx (8.923 s)
  ● Archive › renders correctly
    expect(element).not.toBeVisible()
    Received element is visible:
      <li aria-label="month-link" />

      49 |     userEvent.click(plusText2021)
      50 |
    > 51 |     expect(monthLInkList[0]).not.toBeVisible() 
```

PRを見るとv13からv14の変更で結構なBREAKING CHANGESがある模様

公式を見に行くと

こっちが以前のv13

[user-event v13 | Testing Library](https://testing-library.com/docs/ecosystem-user-event/)

そもそも使い方がガッツリ変わったようで、そういうアナウンスがあった

こちらが新しいバージョンのドキュメント

[Introduction | Testing Library](https://testing-library.com/docs/user-event/intro)

ということで、公式ドキュメントにしたがって

使い方を変えて解決

```javascript
const user = userEvent.setup()

await user.click(hogeButton)
```

`setup()`の戻り値を変数定義しそこから`click()`を呼ぶように変更

clickの戻り値がPromiseになったみたいなので`await`が必要、それに付随してテストの関数部分に`async`も付与

詳しい差分は下記へ

[chore(deps): update dependency @testing-library/user-event to v14 by renovate · Pull Request #722 · swfz/til](https://github.com/swfz/til/pull/722/commits/bb4fec24cc32ce35fb442f340182ef4e857c38a5)

こういうのたまにあるのでやはりテスト少しでも書いておくと良いなと感じる
