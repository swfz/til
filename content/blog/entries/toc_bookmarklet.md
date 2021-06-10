---
title: "TOCを抽出するためのブックマークレット"
date: "2021-06-10"
description: "TOC"
tags:
  - Bookmarklet
---

他の記事はどのような構成なんだろう？

記事書くときにどのような流れが良いのかなー？

と考えることがあったのでTOCを収集して傾向などを見つけてみようと思ったので掲題のブックマークレットを書いた

- toc.js

```javascript
(() => {
  const log = (msg) => { console.log(msg) };
  log('start extract toc');

  const o = (body) => {
    const d = window.open().document;
    d.writeln('TOC<br /><textarea cols="100" rows="30">' + body + '</textarea>');
    d.close();
  };

  const toc = Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(e => {
    const n = e.tagName.replace("H","");
    return `${"#".repeat(n)} ${e.textContent}`;
  }).join("\n");
  log(toc);
  o(toc);
})();
```

ブックマークに登録するときは次のように1行にしてスペースはエスケープする

```javascript
javascript:(()%20=>%20{%20const%20log%20=%20(msg)%20=>%20{%20console.log(msg)%20};%20log('start%20extract%20toc');%20const%20o%20=%20(body)%20=>%20{%20const%20d%20=%20window.open().document;%20d.writeln('TOC<br%20/><textarea%20cols="100"%20rows="30">'%20+%20body%20+%20'</textarea>');%20d.close();%20};%20const%20toc%20=%20Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(e%20=>%20{%20const%20n%20=%20e.tagName.replace("H","");%20return%20`${"#".repeat(n)}%20${e.textContent}`;%20}).join("\n");%20log(toc);%20o(toc);%20})();
```

こんな感じの出力が得られる

```
## WSL側
## Xlaunch
## WSL側
### 参考：
```

なお、対象ページでタイトル以外にも`h2`などを付けているとその情報も入ってきてしまう
