---
title: "Rubyで進捗表示のスクリプトを書くとき"
date: "2021-01-23"
description: "print + \r つかう"
tags:
  - Ruby
---

```ruby
(1..100).each { |n| print "#{'#' * n}#{'-' * (100 - n)} #{n}% \r"; sleep 1}
```

書き捨てスクリプトなどで進捗を表示させたいときなど`\r`を末尾に付けることで再描画できるので進捗が進んでいるような見え方をさせられる

![alt](ruby_progress_bar01.gif)
