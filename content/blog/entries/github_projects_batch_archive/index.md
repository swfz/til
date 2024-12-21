---
title: "GitHub ProjectsのItemを一括Archive"
date: "2022-09-04"
description: "desc"
tags:
  - GitHub
  - GitHub Projects
  - JavaScript
---

Projects自体はItemが1200件までしか作れない、それ以上扱いたい場合は既存のItemをDelete or Archiveしなければならない

なのでArchiveするという選択肢になるが、今度は2022-08-31時点ではArchiveするAPI（mutation）がない

GUIの中でBoardViewだと各リストに一括Archiveできる機能もあるがStatusかIteration単位でしかグループ化できない

なのでIterationを設定する前のItemについては一括で扱うしかない状態になってしまう

Iteration設定されていないものを一括でArchiveするのもなんとなく嫌だなと思ったので

雑だが簡単なコードを書いた

## consoleでの一回の操作

```javascript
$('.menu-trigger').click()
$('[data-test-id="row-menu-archive"]').click()
$x('//button[text()="Archive"]')[0].click()
```

- メニューを出して
- Archiveをクリックして
- Confirmする

というながれを一番上のItemで行うためのコード

## まとめて操作

```javascript
function archive() {
  document.querySelector('.menu-trigger').click();
  document.querySelector('[data-test-id="row-menu-archive"]').click();
  document.evaluate('//button[text()="Archive"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()
}
```

一番上のItemをArchiveする操作を関数にまとめ

```javascript
setInterval(archive, 2000);
```

定期実行することでたまっているItemを自動でArchiveする

使い方としてはある程度フィルタリングして全件Archive

あと全部ArchiveされるとItemがない状態になるので実行時エラーになる

丁寧にやるならエラーをキャッチしてclearIntervalまでしてあげれば良さそうだが…

## XPath周りでの差分

関数化するとdevtoolで便利な`$`が使えないので一部修正した

さらにXPath周りはちょっと勝手が違った

- 参考

[JavaScript での XPath の利用の手引き - XPath | MDN](https://developer.mozilla.org/ja/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript)

ただ単に`document.evaluate`するだけだと`click()`できるNodeが返却値に含まれない

オプションで返却値の指定をしてNodeを取れるようにしてからノードを取得、クリックといった処理になった

今回は初回に見つかったNodeだけを取得したいので`FIRST_ORDERED_NODE_TYPE`を指定し`sinbleNodeValue`でNodeを取得した
