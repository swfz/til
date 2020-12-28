---
title: "Redisに対してGemからpingする"
date: "2020-12-28"
description: "ping"
tags:
  - Redis
  - Resque
  - Ruby
---

Redisの疎通確認するときなどに

小規模であれば`keys *`で良いのでは感もあるがこちらのほうが目的にマッチしていて良さそう

- Redisのみ使っている場合

```ruby
require 'redis'
Redis.new.ping # "PONG"
```

Resque使っている場合はResqueに生えているのでそちらから使っても良い

- Resqueから使う場合

```ruby
require 'resque'
Resque.redis.ping # "PONG"
```

ちょっと中身読んだらNodeごとにpingだしているっぽいのでクラスタ組んでる場合は要件が変わってくるかも
