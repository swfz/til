---
title: "MUI TextFieldのInputPropsとinputPropsの違い"
date: "2023-02-16"
description: "適用させるコンポーネントが違う"
tags:
  - MUI
  - MaterialUI
  - React
---

仕事でMUIを使ったコードを読んでたらTextFieldのプロパティに`inputProps`, `InputProps`と`i`,`I`で両方あることに気付いた

違いは何だと言うことで調べた

[TextField API - Material UI](https://mui.com/material-ui/api/text-field/)

## InputProps

Input要素に適用されるプロパティ

> variant prop の値に応じて、FilledInput、OutlinedInput、Inputコンポーネントのいずれかになる

<!-- textlint-disable ja-technical-writing/sentence-length -->
なるほど、TextFieldはFilledInput,OutlinedInput,Inputをより抽象化したコンポーネントで、この3つのコンポーネントのどれかに適用させるプロパティを指定するということのよう
<!-- textlint-enable ja-technical-writing/sentence-length -->

試しにFilledInputのAPIドキュメントを見に行くと`inputProps`のみしかないのでなるほどとなった

[FilledInput API - Material UI](https://mui.com/material-ui/api/filled-input/)

このページでのPropsの中で指定したいものがあれば指定するとういことと理解した

たとえば`color`とか

<!-- textlint-disable ja-technical-writing/sentence-length -->
あとはTextFieldを使って汎用的なカスタムコンポーネントを作った場合なども`InputProps`を受け取ってそのまま`TextField`に流すことでカスタマイズ可能で汎用的なカスタムコンポーネントを作れる
<!-- textlint-enable ja-technical-writing/sentence-length -->

## inputProps

input要素に適用するプロパティを指定する

お馴染みの`input`タグに指定するプロパティを指定する

たとえば`value`とか


どのタグやコンポーネントに作用させたいかでPropsの大文字小文字を切り替えると理解した

よく考えられているなーと感じたが初見ではとっつきづらいしややこしいな…と感じた
