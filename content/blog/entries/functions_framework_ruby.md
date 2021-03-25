---
title: "Functions framework Rubyを試す"
date: "2021-03-25"
description: "Ruby2.7ベータ版"
tags:
  - Ruby
  - GoogleCloudPlatform
  - CloudFunctions
---

## 環境

```
ruby: 2.7.1
```

- Gemfile

```ruby
source "https://rubygems.org"

gem "functions_framework"
gem "activesupport"
gem "awesome_print"
gem "sinatra"
```

- app.rb

```ruby
require "functions_framework"
require "active_support/all"
require "sinatra/base"
require "json"

class Router < Sinatra::Base

  before do
    if params['zone'].present?
      Time.zone = params['zone']
    end
  end

  get('/') do
    content_type :json
    {path: 'slash'}.to_json
  end

  get('/yesterday') do
    content_type :json
    {
      date: {
        from: Time.current.yesterday.strftime('%Y-%m-%d'),
        to: Time.current.yesterday.strftime('%Y-%m-%d'),
      },
      ymd: {
        from: Time.current.yesterday.strftime('%Y%m%d'),
        to: Time.current.yesterday.strftime('%Y%m%d'),
      },
      time: {
        from: Time.current.yesterday.strftime('%Y-%m-%dT00:00:00'),
        to: Time.current.yesterday.strftime('%Y-%m-%dT23:59:59')
      }
    }.to_json
  end

  get('/last_week') do
    content_type :json
    {
      recent: {
        date: {
          from: 1.week.ago.strftime('%Y-%m-%d'),
          to: Time.current.yesterday.strftime('%Y-%m-%d')
        },
        time: {
          from: 1.week.ago.strftime('%Y-%m-%dT00:00:00'),
          to: Time.current.yesterday.strftime('%Y-%m-%dT23:59:59')
        }
      }
    }.to_json
  end

  get('/this_month') do
    content_type :json
    {
      last_month_in_first_day: {
        date: {
          from: Time.current.ago(1.day).beginning_of_month.strftime('%Y-%m-%d'),
          to: Time.current.ago(1.day).end_of_month.strftime('%Y-%m-%d')
        },
        time: {
          from: Time.current.beginning_of_month.strftime('%Y-%m-%d 00:00:00'),
          to: Time.current.end_of_month.strftime('%Y-%m-%d 23:59:59')
        }
      },
      this_month_in_first_day: {
        date: {
          from: Time.current.beginning_of_month.strftime('%Y-%m-%d'),
          to: Time.current.end_of_month.strftime('%Y-%m-%d')
        },
        time: {
          from: Time.current.beginning_of_month.strftime('%Y-%m-%d 00:00:00'),
          to: Time.current.end_of_month.strftime('%Y-%m-%d 23:59:59')
        }
      }
    }.to_json
  end


  not_found do
    "Not Found."
  end
end

FunctionsFramework.http("datetime") do |request|
  Router.call(request.env)
end
```

Sinatraを入れて簡単なサーバを立ち上げられるようにした

## ローカルでサーバを起動する

```shell
$ bundle exec functions-framework-ruby --target datetime
I, [2021-03-25T14:23:00.382244 #28918]  INFO -- : FunctionsFramework v0.9.0
I, [2021-03-25T14:23:00.383176 #28918]  INFO -- : FunctionsFramework: Loading functions from "./app.rb"...
I, [2021-03-25T14:23:01.533809 #28918]  INFO -- : FunctionsFramework: Looking for function name "datetime"...
I, [2021-03-25T14:23:01.534009 #28918]  INFO -- : FunctionsFramework: Starting server...
I, [2021-03-25T14:23:01.643239 #28918]  INFO -- : FunctionsFramework: Serving function "datetime" on port 8080...
```

- たたいてみる

```shell
$ curl 'http://localhost:8080/yesterday?zone=Asia%2FTokyo'
{"date":{"from":"2021-03-24","to":"2021-03-24"},"ymd":{"from":"20210324","to":"20210324"},"time":{"from":"2021-03-24T00:00:00","to":"2021-03-24T23:59:59"}}
```

返ってきた

## deployする

```
$ gcloud functions deploy datetime \
    --project=sample-project \
    --runtime=ruby27 \
    --trigger-http \
    --entry-point=datetime
```

## 確認

```shell
$ curl -X GET -H "Authorization: Bearer $(gcloud auth print-identity-token)" 'https://us-central1-sample-project.cloudfunctions.net/datetime/yesterday?zone=Asia%2FTokyo'
{"date":{"from":"2021-03-24","to":"2021-03-24"},"ymd":{"from":"20210324","to":"20210324"},"time":{"from":"2021-03-24T00:00:00","to":"2021-03-24T23:59:59"}}
```

OIDC認証もバッチリ

## ドキュメント

[File: Deploying Functions — Functions](https://googlecloudplatform.github.io/functions-framework-ruby/v0.9.0/file.deploying-functions.html)
