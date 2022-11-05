---
title: "JSONから構造体へ変換する"
date: "2022-11-05"
description: "Unmarshal"
tags:
  - Go
---

トップレベルが配列`[]`とマップ`{}`の場合のUnmarshal

- サンプル

```go
package main

import(
	"fmt"
	"encoding/json"
)

type Sample struct {
	Hoge int `json:"hoge"`
	Fuga string `json:"fuga"`
}

func mapJson() {
	str := `{"hoge":1,"fuga":"piyo"}`
	var data Sample
	if err := json.Unmarshal([]byte(str), &data); err != nil {
		panic(err)
	}

	fmt.Printf("%#v\n", data)
}

func sliceJson() {
	str := `[{"hoge":1,"fuga":"piyo"},{"hoge":2,"fuga":"piyopiyo"}]`
	var data []Sample
	if err := json.Unmarshal([]byte(str), &data); err != nil {
		panic(err)
	}

	fmt.Printf("%#v\n", data)
}

func main() {
	mapJson()
	sliceJson()
}
```

- 実行

```shell
$ go run json.go
main.Sample{Hoge:1, Fuga:"piyo"}
[]main.Sample{main.Sample{Hoge:1, Fuga:"piyo"}, main.Sample{Hoge:2, Fuga:"piyopiyo"}}
```

変数宣言の部分で型を用意しているとそんなに違和感ない

`interface{}`になるとこんがらがってしまったがまとめながら見たら特につまずきポイントもない…

- マップ

```
var data map[string]interface{}
```

- 配列

```
var data []map[string]interface{}
```

- 実行

```
$ go run json.go
map[string]interface {}{"fuga":"piyo", "hoge":1}
[]map[string]interface {}{map[string]interface {}{"fuga":"piyo", "hoge":1}, map[string]interface {}{"fuga":"piyopiyo", "hoge":2}}
```