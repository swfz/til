---
title: "S3のpresigned_url発行時にキー以外の名前のファイルをDL可能にする"
date: "2021-07-25"
description: "response_content_disposition"
tags:
  - S3
  - AWS
---

S3でpresigned_urlを発行してファイルをDLさせる場合（サンプルはAWS-SDKのRubyクライアントを使用）

S3にあるファイルを別名でダウンロードさせるためには`response_content_disposition`の指定を良しなにする

```
  response_content_disposition: "attachment; filename=hoge.txt"
```

上記の場合はDL時`hoge.txt`というファイル名でDLされる

また、S3へのファイル作成時に`metadata`というキーで任意のパラメータ指定が可能

下記のようにファイル生成時の情報を元にファイル名を決めたいと言うようなケースにも対応できる

以下例

## ファイル作成時

```ruby
s3client = Aws::S3::Client.new
s3client.put_object(
  bucket: 'sample-bucket',
  key: 'sample-key',
  body: File.read(filename),
  content_type: 'text/csv',
  metadata: {
    hoge: 'fuga'
  }
)
```

## presigned url生成時

```ruby
s3client = Aws::S3::Client.new

object = s3client.head_object(
  bucket: 'sample-bucket',
  key: 'sample-key'
)
metadata = object.metadata

signer = Aws::S3::Presigner.new
signer.presigned_url(
  :get_object,
  bucket: 'sample-bucket',
  key: 'sample-key',
  expires_in: 300,
  response_content_disposition: "attachment; filename=#{metadata['hoge']}.txt"
)
```

ファイル生成時に`metadata.hoge`の値`fuga`をファイル名に含めることができた

上記例だと`fuga.txt`というファイル名でダウンロードできる
