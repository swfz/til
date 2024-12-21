---
title: Rubyでmarkdownのmetadata(front_matter)をパースする
date: "2020-09-14"
description: "front_matter_parser"
tags:
  - Ruby
  - Markdown
---

## metadata

Gatsbyなどでも使っているMarkdownにタイトルなどの情報を付与するための構文

front_matterと言うらしい

RubyでMarkdownをパースしてはてなブログにPOSTするためのスクリプトを書いていてこのfront_matterにも対応させるかーという流れになった

YAMLのGemでパースできるかと思ってちょっと調べてみたがそうでもなかった

[ruby - How to include metadata in a template file? - Stack Overflow](https://stackoverflow.com/questions/538650/how-to-include-metadata-in-a-template-file)

上記試してみたが`Psych::SyntaxError`が出てしまい面倒になったのでGemを探すことにした

結局こっちを使うことに

[waiting-for-dev/front_matter_parser: Ruby library to parse files or strings with a front matter. It has automatic syntax detection.](https://github.com/waiting-for-dev/front_matter_parser)

中身的には結構愚直にやってた

## サンプル

- hoge.md

```
---
title: サンプルタイトル
date: 2020-09-14
description: "front_matter_parser"
tags:
  - Ruby
  - Markdown
---


## sub title1
- list1
- list2
- list2

## sub title2

hoge fuga
```

- parse

```ruby
[8] pry(main)> yaml_loader = FrontMatterParser::Loader::Yaml.new(whitelist_classes: [Time, Date])
=> #<FrontMatterParser::Loader::Yaml:0x00007fffdb031d20 @whitelist_classes=[Time, Date]>
[9] pry(main)> parsed = FrontMatterParser::Parser.parse_file('hoge.md', loader: yaml_loader)
=> #<FrontMatterParser::Parsed:0x00007fffdaac8c58
 @content="## sub title1\n- list1\n- list2\n- list2\n\n## sub title2\n\nhoge fuga\n\n",
 @front_matter=
  {"title"=>"サンプルタイトル",
   "date"=>#<Date: 2020-09-14 ((2459107j,0s,0n),+0s,2299161j)>,
   "description"=>"front_matter_parser",
   "tags"=>["Ruby", "Markdown"]}>
```

yaml_loaderでwhitelistにDateやTimeなど日付関連のクラスをwhitelistに追加している

これを追加していないと日付や時間のフォーマットが入っていた場合に下記のように怒られてしまう

`Psych::DisallowedClass: Tried to load unspecified class: Date`

とりあえず使うならこのくらいでOKそう

## 2022-05-08追記

追記時点では執筆時と違いallowlistとして指定する必要がある

READMEもそういう記述になっている

[waiting-for-dev/front_matter_parser: Ruby library to parse files or strings with a front matter. It has automatic syntax detection.](https://github.com/waiting-for-dev/front_matter_parser)

差分としては下記のようになる

```diff
- yaml_loader = FrontMatterParser::Loader::Yaml.new(whitelist_classes: [Time, Date])
+ yaml_loader = FrontMatterParser::Loader::Yaml.new(allowlist_classes: [Time, Date])
```
