---
title: PixelaのデータをExportする
date: "2020-10-01"
description: "Ruby Clientを使う"
tags:
  - Ruby
  - Pixela
---

ただただデータをためて習慣化とかまでは良いんだけどいくつかのデータを使ってゴニョゴニョしたいときにExportしたいなと思った

APIのエンドポイントとしては提供されていないが組み合わせれば取得できそうだったので書いてみた

clientライブラリは下記を使った

[sue445/pixela: Pixela API client for Ruby](https://github.com/sue445/pixela)

```ruby
require 'pixela'

client = Pixela::Client.new(username: 'swfz', token: ENV['PIXELA_TOKEN'])

# dates
# ap client.graph('m-issue-activity').pixel_dates
# pixel
# ap client.graph('m-issue-activity').pixel(Date.today).get

id = 'm-issue-activity'
from = Date.today - 8
to = Date.today - 1
pixels = client.graph(id).pixel_dates(from: from, to: to).map do |date|
  value = client.graph(id).pixel(date).get['quantity']
  { date: date.strftime('%Y%m%d'), quantity: value }
end

File.write("#{id}.json", pixels.to_json)
```

- m-issue-activity

```json
[
  {
    "date": "20200919",
    "quantity": "3"
  },
  {
    "date": "20200920",
    "quantity": "4"
  },
  {
    "date": "20200921",
    "quantity": "3"
  },
  {
    "date": "20200922",
    "quantity": "17"
  },
  {
    "date": "20200923",
    "quantity": "12"
  },
  {
    "date": "20200924",
    "quantity": "27"
  },
  {
    "date": "20200925",
    "quantity": "33"
  },
  {
    "date": "20200926",
    "quantity": "2"
  }
]
```
