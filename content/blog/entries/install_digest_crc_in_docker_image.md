---
title: "digest-crc gemがインストールできない"
date: "2020-11-07"
description: "development toolsをインストールして解決"
tags:
  - Ruby
  - Docker
---

CloudRun Rubyのチュートリアルを進めた後に`google-cloud`のGemを使っていろいろやってみようとインストールして見たら怒られた

- Dockerfile

```dockerfile
FROM ruby:2.7-slim

WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_FROZEN=true
RUN gem install bundler && bundle install --without test

COPY . ./

CMD ["ruby", "./app.rb"]
```

- Gemfile

```ruby
source "https://rubygems.org"

gem "google-cloud-storage"
gem "google-cloud-secret_manager"
gem "sinatra", "~>2.0"

group :test do
  gem "rack-test"
  gem "rest-client"
  gem "rspec"
  gem "rspec_junit_formatter"
  gem "rubysl-securerandom"
end
```

```
Installing digest-crc 0.6.1 with native extensions
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /usr/local/bundle/gems/digest-crc-0.6.1/ext/digest
/usr/local/bin/ruby -I/usr/local/lib/ruby/2.7.0/rubygems -rrubygems
/usr/local/lib/ruby/gems/2.7.0/gems/rake-13.0.1/exe/rake
RUBYARCHDIR\=/usr/local/bundle/extensions/x86_64-linux/2.7.0/digest-crc-0.6.1
RUBYLIBDIR\=/usr/local/bundle/extensions/x86_64-linux/2.7.0/digest-crc-0.6.1
/usr/local/bin/ruby -S extconf.rb
checking for stdint.h... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/local/bin/$(RUBY_BASE_NAME)
        --with-stdint-dir
        --without-stdint-dir
        --with-stdint-include
        --without-stdint-include=${stdint-dir}/include
        --with-stdint-lib
        --without-stdint-lib=${stdint-dir}/lib
/usr/local/lib/ruby/2.7.0/mkmf.rb:471:in `try_do': The compiler failed to
generate an executable file. (RuntimeError)
You have to install development tools first.
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:613:in `try_cpp'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:1124:in `block in have_header'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:971:in `block in checking_for'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:361:in `block (2 levels) in postpone'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:331:in `open'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:361:in `block in postpone'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:331:in `open'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:357:in `postpone'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:970:in `checking_for'
        from /usr/local/lib/ruby/2.7.0/mkmf.rb:1123:in `have_header'
        from extconf.rb:3:in `<main>'
rake aborted!
Command failed with status (1): [/usr/local/bin/ruby -S extconf.rb...]
/usr/local/bundle/gems/digest-crc-0.6.1/ext/digest/Rakefile:32:in `block (3
levels) in <top (required)>'
/usr/local/bundle/gems/digest-crc-0.6.1/ext/digest/Rakefile:31:in `chdir'
/usr/local/bundle/gems/digest-crc-0.6.1/ext/digest/Rakefile:31:in `block (2
levels) in <top (required)>'
Tasks: TOP => default => crc15/crc15_ext.so => crc15/Makefile
(See full trace by running task with --trace)

rake failed, exit code 1

Gem files will remain installed in /usr/local/bundle/gems/digest-crc-0.6.1 for
inspection.
Results logged to
/usr/local/bundle/extensions/x86_64-linux/2.7.0/digest-crc-0.6.1/gem_make.out

An error occurred while installing digest-crc (0.6.1), and Bundler cannot
continue.
Make sure that `gem install digest-crc -v '0.6.1' --source
'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  google-cloud-storage was resolved to 1.29.1, which depends on
    digest-crc
The command '/bin/sh -c gem install bundler && bundle install --without test' returned a non-zero code: 5
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 5

-----------------------------------------------------------------------------------------------------------------------------------------------------

ERROR: (gcloud.builds.submit) build 57e77985-ae0b-40b7-b0d7-04ce7bcbd099 completed with status "FAILURE"
```

ちょっと調べただけだとわからなかった

ruby2.7-slim -> ruby2.7にしたらインストールできたのでいったんそれでも良いかと思ったがよく読んだら

`You have to install development tools first.`ということで次の対応でインストールできるようにした

```diff
 COPY Gemfile Gemfile.lock ./
 ENV BUNDLE_FROZEN=true
+
+RUN apt-get update && apt-get install -y \
+    build-essential
```

もっと詳しい中身までは追っていない…
