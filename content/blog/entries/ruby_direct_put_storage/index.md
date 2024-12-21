---
title: "RubyでAPIレスポンスを直接クラウドストレージにputする"
date: "2020-11-14"
description: "stringIO"
tags:
  - Ruby
---

いまさら感はあるがよくどうだったっけーみたいな感じでググっているのでここらで残しておく

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
よくあるケースだと思うが次のようなパターンのとき
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

- APIからデータを取得
- データをストレージに保存

ファイルを生成してそれをS3やGCSへPUTみたいなのはよく見るがわざわざ一時的にファイルへ保存しなくても良い場合

`StringIO.new`した値を渡すことで直接PUTできる

`StringIO`が`IO`のinterfaceを扱える(`read`できる)のでファイルを扱っているのと同様に扱える

サンプルでTooglのAPIレスポンスをGCSへPUTするスクリプトを書いた

- app.rb

```ruby
#!/usr/bin/env ruby

require 'json'
require 'net/https'
require 'base64'
require 'google/cloud/storage'

def put_object(data)
  bucket_name = 'dev-raw-data'
  path = 'hoge/res.json'
  client = Google::Cloud::Storage.new
  bucket = client.bucket bucket_name
  io = StringIO.new data

  bucket.create_file io, path
end

def main
  token = ENV['TOGGL_API_TOKEN']
  workspace_id = ARGV[0]
  from = '2020-01-01'
  to   = '2020-02-01'

  params = {
    workspace_id: workspace_id,
    since: from,
    until: to,
    user_agent: 'api_test'
  }

  uri = URI.parse 'https://toggl.com/reports/api/v2/details'
  uri.query = URI.encode_www_form params

  http = Net::HTTP.new uri.host, uri.port
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  headers = { Authorization: "Basic #{Base64.encode64("#{token}:api_token")}" }

  res = http.request_get uri, headers
  put_object res.body
end

main
```


