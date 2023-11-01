---
title: "prismjs用のサンプル"
date: "2023-11-01"
description: "desc"
tags:
  - prismjs
  - Sample
---

何かしら動作させて見た目の確認をするためのページ

## 各言語の表示

- JavaScript

```javascript
const hoge = 1;
const fuga = 'aaaaa';
```

- bash 10行以上

```bash
#!/bin/bash

# CSVを読み込み各行でCSVのカラム数をプリントする
# ./columns.sh hoge.csv

file=$1

lines=$(wc -l ${file} | awk '{print $1}')

echo "${file}"
for i in `seq 1 $lines`; do
  cat ${file} | awk -F ',' "NR==${i}{print NR,NF}"
done
```

- shell

```shell
$ ps aux | grep hoge
```

- text

```text
info Total nodes: 1097, SitePage nodes: 364 (use --verbose for breakdown)
success Checking for changed pages - 0.007s
success onPreExtractQueries - 0.001s
success extract queries from components - 0.068s
success write out requires - 0.001s
success Writing page-data.json and slice-data.json files to public directory - 0.011s - 1/357 31692.20/s
```

- Markdown

```markdown
# sample

## h2
- list
    - list2

### h3
* aaa
* bbb

## h2-2
1. aaa
1. bbb

## 引用
> 引用
> > 二重引用

## 強調表示

*強調*
** 強調2 **

## リンク

[google](http://google.com "alt")

## 画像

![text](blog.png "alt")

## 表

| th1 | th2 | th3 |
|:-|:-|:-|
| 1-1 | 1-2 | 1-3 |
| 2-1 | 2-2 | 2-3 |
```

## ハイライト

1行分、複数行分

```typescript{1-4,13}
type Row = {
  name: string;
  value: number;
}
const rows: Row[] = [
  {name: 'foo', value: 1},
  {name: 'bar', value: 2},
  {name: 'baz', value: 3},
  {name: 'bar', value: 2},
];
const summary = rows.reduce<Record<string, Row>>((acc,current) => {
  const key = current.name;
  return {...acc, [key]: {...acc[key], value: (acc[key]?.value ?? 0) + current.value}}
}, {} );

console.log(summary); // { foo: { value: 1 }, bar: { value: 4 }, baz: { value: 3 } }
```


## 差分

`diff-ruby`

```diff-ruby
- yaml_loader = FrontMatterParser::Loader::Yaml.new(whitelist_classes: [Time, Date])
+ yaml_loader = FrontMatterParser::Loader::Yaml.new(allowlist_classes: [Time, Date])
```