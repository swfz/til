---
title: "文字列からgithubv4.Dateに変換する"
date: "2022-10-29"
description: "json.Unmarshalすごい"
tags:
  - Go
  - GitHub
  - GitHub CLI
---

GoでGitHub CLIの拡張を作っている際

GraphQLでProjectV2のデータ更新しようとしていた

しかし、ProjectV2の日付フィールドを更新しようといろいろやったが全然うまくいかずかなり時間を溶かしてしまったので残しておく

## GraphQLのmutationとパラメータを指定する部分

一部抜き出した（このコードじゃ動かない）

```go
	var mutation struct {
		UpdateProjectV2ItemFieldValue struct {
			ClientMutationID string
		} `graphql:"updateProjectV2ItemFieldValue(input: {projectId: $projectId itemId: $itemId fieldId: $fieldId value: {date: $value}})"`
	}
	dateString := "2022-10-01"
	variables := map[string]interface{}{
		"projectId": graphql.ID(projectId),
		"itemId":    graphql.ID(itemId),
		"fieldId":   graphql.ID(fieldId),
		"value":     dateString,
	}
	err = gqlclient.Mutate("Assign", &mutation, variables)
```

## DATE型のフィールド

GitHubのドキュメント

[スカラー - GitHub Docs](https://docs.github.com/ja/graphql/reference/scalars#date)

上記のように文字列で投げたら怒られる

```
Message: Type mismatch on variable $value and argument date (ID! / Date), Locations: [{Line:1 Column:168}]
```

`$value`はDate型が必要ですよと

[githubv4/scalar.go at master · shurcooL/githubv4](https://github.com/shurcooL/githubv4/blob/master/scalar.go)

`githubv4.Date`の定義を見に行くと

```go
Date struct { time.Time }
```

となっている

## 型キャスト

ということで、普通にキャストすればよいかと思ったがだめだった

```go
	var mutation struct {
		UpdateProjectV2ItemFieldValue struct {
			ClientMutationID string
		} `graphql:"updateProjectV2ItemFieldValue(input: {projectId: $projectId itemId: $itemId fieldId: $fieldId value: {date: $value}})"`
	}
	dateString := "2022-09-01T00:00:00Z"
	t, _ := time.Parse("2006-01-02T15:04:05Z", dateString)
	variables := map[string]interface{}{
		"projectId": graphql.ID(projectId),
		"itemId":    graphql.ID(itemId),
		"fieldId":   graphql.ID(fieldId),
		"value":     githubv4.Date(t),
	}
	err = gqlclient.Mutate("Assign", &mutation, variables)
```

型エラーで怒られる

```
cannot convert t (variable of type time.Time) to type githubv4.Date
```

## 動くコード

結局下記のようなコードで動かした

```go
package main

import (
	"encoding/json"
	"fmt"
	"github.com/cli/go-gh"
	graphql "github.com/cli/shurcooL-graphql"
	"github.com/shurcool/githubv4"
	"log"
)

type NamedDateValue struct {
	Date githubv4.Date `json:"date,omitempty"`
}

func main() {
	projectId := "適当なIDを入れる"
	itemId := "適当なIDを入れる"
	fieldId := "適当なIDを入れる"

	gqlclient, err := gh.GQLClient(nil)
	if err != nil {
		log.Fatal(err)
	}

	var mutation struct {
		UpdateProjectV2ItemFieldValue struct {
			ClientMutationID string
		} `graphql:"updateProjectV2ItemFieldValue(input: {projectId: $projectId itemId: $itemId fieldId: $fieldId value: {date: $value}})"`
	}

	b := []byte(`{"date":"2022-09-01T00:00:00Z"}`)
	var v NamedDateValue
	if err := json.Unmarshal(b, &v); err != nil {
		panic(err)
	}

	variables := map[string]interface{}{
		"projectId": graphql.ID(projectId),
		"itemId":    graphql.ID(itemId),
		"fieldId":   graphql.ID(fieldId),
		"value":     v.Date,
	}

	err = gqlclient.Mutate("Assign", &mutation, variables)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(mutation)
}
```

こんな感じ

`NamedDateValue`という型を定義して`json.Unmarshal`で変換する

この構造体は`githubv4.Date`型の`Date`フィールドを持っている

GraphQLのパラメータを渡す際に`v.Date`で型を合うようにした

もっとよい方法がありそうだが今の自分の力ではこれが限界だった

ただこれを解決しないと進めなかったのでいろいろ調べて勉強にはなった

ということで`json.Unmarshal`すごい