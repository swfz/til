---
title: "RailsのRoutingでmountするアプリに制限を掛ける"
date: "2020-12-23"
description: "constraintsで行える"
tags:
  - Rails
  - Ruby
---

今までRailsではDeviseを使って認証していたので

たとえば`Resque::Server`などmountするアプリケーションを追加したい場合

次のようなコードを`config/routes.rb`に追記すれば特定ロールのユーザーに対してのみ公開できるようにできていた

- config/routes.rb

```ruby
require 'resque/server'
authenticate :user, ->(user) { user.admin? } do
  mount Resque::Server.new, :at => '/resque'
end
```

`authenticate`を使用して条件付きでmountさせるという感じ

ただ、deviseを使っていない場合はどうすれば良いんだろうこということで、どのような方法があるか調べた

## constraints

特定のルーティングに対して制限を掛けられる

詳しい実装方法やパターンは次のドキュメントに載っている

[Rails Routing from the Outside In — Ruby on Rails Guides](https://guides.rubyonrails.org/routing.html#advanced-constraints)

[https://guides.rubyonrails.org/routing.html#advanced-constraints:embed:cite]

クラスを定義する場合は`matches?`メソッドを用意して真偽値を返す

引数にrequestが渡ってくるのでその中に`id`なり何なりをもたせておけばそれをもとにUserを持ってきてAdminか?みたいなチェックを行うことで制限を掛けられる

<!-- textlint-disable aws-spellcheck -->
lambdaでその場に直接処理を書いてしまうことも可能
<!-- textlint-enable aws-spellcheck -->

セッションにUserのIDなどをもたせておけばログイン時かつそのユーザーが管理者であればページを公開するといったことがサクッと書ける

サンプル

- config/routes.rb

```ruby
require 'resque/server'
mount Resque::Server.new, :at => '/resque', constraints: lambda { |req| req.session['user_id'].present? && User.find_by(id: req.session['user_id']).admin? }
```

今まで思考停止でやっていたので勉強になりました