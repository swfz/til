---
title: "element.click()を特定要素が取得できるまで待つ"
date: "2024-12-13"
description: ""
tags:
  - JavaScript
  - HTML
---

chrome拡張を作っていて、たとえばSlackに自動で投稿するみたいな機能を作っていた

SlackのUIは

- テキストエリアに何か入力したら送信ボタンのdisableが消えて送信可能な状態になる
- Enterキー押下もしくは送信ボタンをクリックでテキストを投稿できる

単純にテキストエリアにテキストを入れ込み、送信ボタンをクリックする処理を行えば行けるよねと思っていた

が、devtoolで確認するときは1つの処理ごとコンソールに入力し動作するが、いざ組み合わせて実行するとうまくいかない

<!-- textlint-disable prh -->
1度目の実行でテキストが入力された状態になる
<!-- textlint-enable prh -->

2度目実行すると送信される

ということは送信ボタンがクリックされていない…

devtoolで確認したときは手動なので気付かなかったが、入力からクリックまでの時間が短いと、UI側が入力を検知して送信ボタンのdisableを解除する前にクリックしてしまっている状態のようだった

なので自動で処理させる場合はクリックする対象の要素のdisable状態とクリック可能な状態を把握し押下可能な状態のセレクタで要素が取得できるまで待つ必要がある

puppeteerでスクレイピングしてたときは普通にwaitForとか使っていたし、まぁよく考えてみれば当たり前ではあるんだけど…

ということで指定のセレクタの要素が出現するまで待つ関数を用意し、出現してクリック可能な状態の要素を取得してクリックするようにする

- 実装

```typescript
const waitForSelector = <T extends Element>(
  selector: string,
  timeout = 2000
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const interval = 100
    let elapsed = 0

    const checkExistence = () => {
      const element = document.querySelector(selector)

      if (element && element instanceof Element) {
        resolve(element as T)
      } else if (elapsed >= timeout) {
        reject(new Error(`Timeout: ${selector} not found`))
      } else {
        elapsed += interval
        setTimeout(checkExistence, interval)
      }
    }
    checkExistence()
  })
}
```

- 呼び出し側

```typescript
const textInput = document.querySelector<HTMLParagraphElement>(".editor p")
textInput.innerText = comment
const submitSelector = 'button.send'

const submitButton = await waitForSelector<HTMLButtonElement>(submitSelector)
submitButton?.click()
```

`waitForSelector`に渡すセレクタは、入力によって変化した部分を指定する必要がある

そうしないと、実際にはクリックできない要素を取得してしまうことになるので`disable`時には取得できないようなセレクタを指定する

差分がない…場合はまた考えないといけないが、たいていどこかしらには変化があるはずなのでそれをうまく取り入れれば行ける

これで特定要素の出現を待ってからクリックできる

勉強になりました
