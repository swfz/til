---
title: "go-ghでCurrentRepositoryが返す値を差し替える"
date: "2023-05-07"
description: "GH_REPOに値を設定する"
tags:
  - Go
---

- 書いたときのバージョン

```
go-gh: v1.2.1
```

v2のリリースもされているがまだ移行していない…

自分で作ったGitHubCLI拡張の中で`go-gh`というライブラリの`CurrentRepository()`を使っている

この関数は今いるディレクトリのリポジトリの情報を取得するもの

拡張の機能上必要だったので使っているが、環境によって値が変わるのでテストを書き始めるとこの辺をうまくしないと環境依存でテストが失敗してしまう

どうしようかと調べたらすぐ出てきた

[gh package - github.com/cli/go-gh - Go Packages](https://pkg.go.dev/github.com/cli/go-gh#section-readme)

`CurrentRepository()は、環境変数GH_REPOの値を尊重し、フォールバックとしてgitリモート設定から読み込む。`

いつもはフォールバックとしてのGitリモート設定から読んでいたわけだ

環境変数で`GH_REPO`を指定すれば指定した値に差し替えられる

`swfz/gh-annotations`のディレクトリで適当なファイルを作って試してみた

- repo.go

```go
package main

import (
	"fmt"
	"github.com/cli/go-gh"
)

func main() {
	repo, _ := gh.CurrentRepository()
	fmt.Printf("%#v\n", repo)
}
```

- GH_REPOなし

```shell
$ go run repo.go
repository.repo{host:"github.com", owner:"swfz", name:"gh-annotations"}
```

- GH_REPOあり

```shell
$ GH_REPO=cli/cli go run repo.go
repository.repo{host:"github.com", owner:"cli", name:"cli"}
```

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
テスト書くならモックしないとなーとは思っていたものの先延ばしにしていたが思ったより簡単だった
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->
