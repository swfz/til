---
title: Rubyのitselfメソッド
date: "2020-06-10"
description: "Object.itselfで文字列カウントなど"
tags:
  - Ruby
---

自分自身を返す`itself`というメソッドがある

2.2から追加されたよう

Object.itself

`group_by`と組み合わせると要素数などのカウントしたい時とかに簡潔に書くことが出来る

```ruby
['a','b','c','b'].group_by(&:itself).transform_values(&:size)
# {"a"=>1, "b"=>2, "c"=>1}
```

`Ruby2.7`からは`tally`メソッドが用意されているので文字数カウント的な用途であればこちらを使うほうが簡潔に書ける

```ruby
['a','b','c','b'].tally
# {"a"=>1, "b"=>2, "c"=>1}
```
