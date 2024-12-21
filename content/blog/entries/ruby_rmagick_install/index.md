---
title: CentOS7系でのrmagickのインストール
date: "2020-07-15"
description: "依存モジュールのインストールが必要"
tags:
  - ImageMagick
  - Ruby
---

サクッとrmagickインストールできなかったので覚え書き

```
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/rmagick-2.15.4/ext/RMagick
/home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/bin/ruby -r ./siteconf20200715-2470-bpwp3n.rb extconf.rb
checking for gcc... yes
checking for Magick-config... no
checking for pkg-config... yes
Package MagickCore was not found in the pkg-config search path.
Perhaps you should add the directory containing `MagickCore.pc'
to the PKG_CONFIG_PATH environment variable
No package 'MagickCore' found
checking for outdated ImageMagick version (<= 6.4.9)... *** extconf.rb failed ***
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
        --ruby=/home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/bin/$(RUBY_BASE_NAME)

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/extensions/x86_64-linux/2.5.0/rmagick-2.15.4/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/rmagick-2.15.4 for inspection.
Results logged to /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/extensions/x86_64-linux/2.5.0/rmagick-2.15.4/gem_make.out

An error occurred while installing rmagick (2.15.4), and Bundler cannot continue.
Make sure that `gem install rmagick -v '2.15.4' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  rmagick
```

ImageMagickインストールするだけではダメだった

ほかに`ImageMAgicka-c++`が必要みたい

```
sudo yum install ImageMagick-c++-devel
```

それでもダメだった

```
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/ruby-filemagic-0.7.0/ext/filemagic
/home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/bin/ruby -r ./siteconf20200715-5698-19exkam.rb extconf.rb
checking for -lgnurx... no
checking for magic_open() in -lmagic... no
*** ERROR: missing required library to compile this module
*** extconf.rb failed ***
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
        --ruby=/home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/bin/$(RUBY_BASE_NAME)
        --with-magic-dir
        --without-magic-dir
        --with-magic-include
        --without-magic-include=${magic-dir}/include
        --with-magic-lib
        --without-magic-lib=${magic-dir}/lib
        --with-gnurx-dir
        --without-gnurx-dir
        --with-gnurx-include
        --without-gnurx-include=${gnurx-dir}/include
        --with-gnurx-lib
        --without-gnurx-lib=${gnurx-dir}/lib
        --with-gnurxlib
        --without-gnurxlib
        --with-magiclib
        --without-magiclib

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/extensions/x86_64-linux/2.5.0/ruby-filemagic-0.7.0/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/gems/ruby-filemagic-0.7.0 for inspection.
Results logged to /home/vagrant/.anyenv/envs/rbenv/versions/2.5.7/lib/ruby/gems/2.5.0/extensions/x86_64-linux/2.5.0/ruby-filemagic-0.7.0/gem_make.out

An error occurred while installing ruby-filemagic (0.7.0), and Bundler cannot continue.
Make sure that `gem install ruby-filemagic -v '0.7.0' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  ruby-filemagic
```

`file-devel`というパッケージも必要だった

```
sudo yum install file-devel
```

- 参考

[file-devel](https://en.it1352.com/article/e29b2d3fec8b45389fba33ad61ab0553.html)
