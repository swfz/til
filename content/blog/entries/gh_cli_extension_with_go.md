---
title: "GitHub CLI拡張を作ってみる"
date: "2022-10-19"
description: "とりあえずHello World"
tags:
  - Go
  - GitHub
  - GitHub CLI
---

[GitHub CLI 拡張機能の作成 - GitHub Docs](https://docs.github.com/ja/github-cli/github-cli/creating-github-cli-extensions)

これを読みながら作成する

今回はGoでHelloWorldまで

## ひな型の作成

```
gh extension create
```

`--precompiled=go`オプションや拡張名などをつけないと対話型モードでやりとりすることになる

- 拡張名を入力する

```
? Extension name:
```

- 種別を選ぶ

```
? What kind of extension?  [Use arrows to move, type to filter]
  Script (Bash, Ruby, Python, etc)
> Go
  Other Precompiled (C++, Rust, etc)
```

決定するとディレクトリが作られるのでそこで開発する

## ローカルインストール

```
gh extension install .
```

これだけで`gh ~~~`でコマンドが使えるようになる

## 中身

- main.go

```go
package main

import (
	"fmt"
	"github.com/cli/go-gh"
)

func main() {
	fmt.Println("hi world, this is the gh-hoge extension!")
	client, err := gh.RESTClient(nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	response := struct {Login string}{}
	err = client.Get("user", &response)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("running as %s\n", response.Login)
}

// For more examples of using go-gh, see:
// https://github.com/cli/go-gh/blob/trunk/example_gh_test.go
```

ちょっとした使い方と詳しくはここ見てねというリンクまで張ってくれていて親切

なんとなく「こういう感じなのね」というのが把握できた

## 変更して実行してみる

試しにメッセージ部分の`!`を増やした

- ビルド

```
go mod tidy
go build
```

- 実行

```
gh ap
hi world, this is the gh-ap extension!!!
running as swfz
```

変更が反映された
