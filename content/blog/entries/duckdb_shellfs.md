---
title: "DuckDBでコンソールから直接コマンドの実行結果を扱いたい"
date: "2024-12-05"
description: "3rd party plugin"
tags:
- DuckDB
- ShellScript
---

通常のユースケースなら、API叩いて返ってきたJSONをローカルに保存してDuckDBで`read_json`する

<!-- textlint-disable ja-technical-writing/sentence-length -->
もしくはAPI叩いてその結果をパイプで渡して`duckdb -c "SELECT * FROM read_json_auto('/dev/stdin', ignore_errors=true)"`で標準出力に結果を出力するといった使い方になる
<!-- textlint-enable ja-technical-writing/sentence-length -->

今回はDuckDB上でコマンドの結果をワンショットでとりあえず使いたいみたいなケース（ファイルに残したくないが、クエリは何度か叩いてデータを見たい）

調べてみたがDuckDBのコマンドラインオプションのみでは難しそうだった

サードパーティの拡張で次のような拡張があったのでこの拡張を使って実現する

[shellfs – DuckDB Community Extensions](https://duckdb.org/community_extensions/extensions/shellfs.html)

- コンソール起動

```
duckdb
```

インメモリモードで起動


- プラグインの読み込み

```
D INSTALL shellfs FROM community;  
D LOAD shellfs;  
```

## いくつかサンプルでクエリしてみる

### GitHubのリポジトリのデータ

GitHub CLIでデータ出力、JSONで出力してそれをそのままクエリする

APIアクセスをする場合はDuckDB内でテーブルを作成（CTAS）してそちらに対してクエリするようにすると親切かな

```sql
D CREATE TABLE repositories  AS SELECT * EXCLUDE(watchers), watchers.totalCount as watchers from read_json_auto('gh repo list --visibility public --limit 200 --json name,stargazerCount,forkCount,watchers |');
D select * from repositories;
┌───────────┬──────────────────────────────────────────────────────────┬────────────────┬──────────┐
│ forkCount │                           name                           │ stargazerCount │ watchers │
│   int64   │                         varchar                          │     int64      │  int64   │
├───────────┼──────────────────────────────────────────────────────────┼────────────────┼──────────┤
│         2 │ tools                                                    │              4 │        2 │
│         0 │ dotfiles                                                 │              3 │        2 │
│         0 │ chrome-extension-copy-markdown-and-hatenablog-embed-link │              2 │        1 │
│         0 │ article-search                                           │              0 │        1 │
│         0 │ chrome-extension-google-slide-usertool-comment-stream    │              2 │        2 │
│         2 │ til                                                      │              1 │        3 │
│         0 │ deno-kusa-image                                          │              0 │        1 │
│         0 │ chrome-extension-slide-comment-stream                    │              0 │        1 │
│         0 │ failed-log-to-slack-action                               │              1 │        1 │
│         0 │ git-hooks                                                │              1 │        1 │
│         0 │ deno-terminal-image                                      │              3 │        1 │
│         0 │ slack-to-obsidian-memos-merge                            │              1 │        1 │
│         3 │ hatenablog_publisher                                     │              1 │        2 │
│         2 │ gh-annotations                                           │             14 │        1 │
│         0 │ crx-message-sample                                       │              0 │        1 │
│         0 │ mise                                                     │              0 │        0 │
│         0 │ sandbox                                                  │              1 │        1 │
│         0 │ obsidian-opener                                          │              0 │        1 │
│         0 │ deno-deploy-sample                                       │              0 │        1 │
│         0 │ deno-kv-logviewer                                        │              0 │        1 │
│         · │         ·                                                │              · │        · │
│         · │         ·                                                │              · │        · │
│         · │         ·                                                │              · │        · │
│         0 │ ansible-role-rbenv                                       │              0 │        2 │
│         0 │ ansible-role-git                                         │              0 │        2 │
│         0 │ mkdocs_sample                                            │              2 │        2 │
│         0 │ playbooks                                                │              0 │        2 │
│         0 │ ansible-role-ojava8                                      │              0 │        2 │
│         0 │ sw_push_notification                                     │              0 │        2 │
│         0 │ js-api                                                   │              0 │        2 │
│         0 │ ansible-playbook-sqs2slack                               │              0 │        2 │
│         0 │ ansible-role-mongodb                                     │              0 │        2 │
│         0 │ ansible-role-percona55                                   │              0 │        2 │
│         0 │ ansible-role-cassandra                                   │              0 │        2 │
│         0 │ ansible-elasticsearch-kibana4                            │              1 │        2 │
│         0 │ cleaver-theme                                            │              0 │        2 │
│         0 │ ansible-role-mysql55                                     │              0 │        2 │
│         0 │ ansible-playbook-rundeck                                 │              0 │        2 │
│         0 │ five_programming_problems_scala                          │              0 │        2 │
│         0 │ angular-elasticsearch-mdl                                │              0 │        2 │
│         0 │ gf_cli                                                   │              0 │        2 │
│         0 │ myApp                                                    │              0 │        2 │
│         0 │ test                                                     │              0 │        2 │
├───────────┴──────────────────────────────────────────────────────────┴────────────────┴──────────┤
│ 126 rows (40 shown)                                                                    4 columns │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### カレントディレクトリ直下のファイル一覧

各種コマンドとjcを組み合わせてJSON化すればいろいろ活用できそう

```sql
D SELECT * FROM read_json_auto('ls -al --color=no | jc --ls |');
┌────────────────────────────────┬────────────┬───────┬─────────┬─────────┬────────┬──────────────┐
│            filename            │   flags    │ links │  owner  │  group  │  size  │     date     │
│            varchar             │  varchar   │ int64 │ varchar │ varchar │ int64  │   varchar    │
├────────────────────────────────┼────────────┼───────┼─────────┼─────────┼────────┼──────────────┤
│ .                              │ drwxrwxr-x │    17 │ swfz    │ swfz    │   4096 │ Dec 19 20:36 │
│ ..                             │ drwxr-x--- │    35 │ swfz    │ swfz    │  12288 │ Dec 20 09:43 │
│ bin                            │ drwxrwxr-x │     2 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ .cache                         │ drwxrwxr-x │    23 │ swfz    │ swfz    │   4096 │ Dec 19 20:59 │
│ CHANGELOG.md                   │ -rw-rw-r-- │     1 │ swfz    │ swfz    │ 144320 │ Nov 1 20:58  │
│ content                        │ drwxrwxr-x │     6 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ custom_word_prh.yml            │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    814 │ Nov 1 20:58  │
│ deploy.sh                      │ -rwxrwxr-x │     1 │ swfz    │ swfz    │   1231 │ Nov 1 20:58  │
│ .devcontainer                  │ drwxrwxr-x │     2 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ eslint.config.mjs              │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   3097 │ Nov 1 20:58  │
│ .eslintrc.json                 │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   1713 │ Nov 1 20:58  │
│ functions                      │ drwxrwxr-x │     3 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ gatsby-browser.tsx             │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    276 │ Nov 1 20:58  │
│ gatsby-config.ts               │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   4647 │ Nov 1 20:58  │
│ gatsby-eslint-custom-rules.mjs │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    447 │ Nov 1 20:58  │
│ gatsby-node.ts                 │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   5421 │ Nov 1 20:58  │
│ gatsby-ssr.tsx                 │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    154 │ Nov 1 20:58  │
│ .git                           │ drwxrwxr-x │     8 │ swfz    │ swfz    │   4096 │ Dec 20 09:27 │
│ .github                        │ drwxrwxr-x │     3 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ .gitignore                     │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   1112 │ Nov 1 20:58  │
│     ·                          │     ·      │     · │  ·      │  ·      │     ·  │      ·       │
│     ·                          │     ·      │     · │  ·      │  ·      │     ·  │      ·       │
│     ·                          │     ·      │     · │  ·      │  ·      │     ·  │      ·       │
│ package.json                   │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   5275 │ Dec 19 20:36 │
│ patches                        │ drwxrwxr-x │     2 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ playwright.config.ts           │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   1735 │ Nov 1 20:58  │
│ postcss.config.cjs             │ -rw-rw-r-- │     1 │ swfz    │ swfz    │     82 │ Nov 1 20:58  │
│ .prettierignore                │ -rw-rw-r-- │     1 │ swfz    │ swfz    │     95 │ Nov 1 20:58  │
│ .prettierrc                    │ -rw-rw-r-- │     1 │ swfz    │ swfz    │     93 │ Nov 1 20:58  │
│ public                         │ drwxrwxr-x │    12 │ swfz    │ swfz    │   4096 │ Dec 19 20:45 │
│ README.md                      │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   2323 │ Nov 1 20:58  │
│ renovate.json                  │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    242 │ Nov 1 20:58  │
│ schema.sql                     │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    106 │ Nov 1 20:58  │
│ setup-test-env.js              │ -rw-rw-r-- │     1 │ swfz    │ swfz    │     35 │ Nov 1 20:58  │
│ src                            │ drwxrwxr-x │     9 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ static                         │ drwxrwxr-x │     2 │ swfz    │ swfz    │   4096 │ Nov 27 11:40 │
│ tailwind.config.cjs            │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    641 │ Nov 1 20:58  │
│ .textlintrc.yml                │ -rw-rw-r-- │     1 │ swfz    │ swfz    │   2177 │ Nov 1 20:58  │
│ tsconfig.json                  │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    464 │ Nov 1 20:58  │
│ vitest.config.ts               │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    186 │ Nov 1 20:58  │
│ vrt                            │ drwxrwxr-x │     3 │ swfz    │ swfz    │   4096 │ Nov 1 20:58  │
│ wrangler.toml                  │ -rw-rw-r-- │     1 │ swfz    │ swfz    │    109 │ Nov 1 20:58  │
│ yarn.lock                      │ -rw-rw-r-- │     1 │ swfz    │ swfz    │ 845328 │ Dec 19 20:36 │
├────────────────────────────────┴────────────┴───────┴─────────┴─────────┴────────┴──────────────┤
│ 47 rows (40 shown)                                                                    7 columns │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```


最後にパイプ`|`をつけてその結果を受け取って`read_json_auto`で読み込むよう

起動ユーザーの権限でコマンド実行しているようなのでいろいろできるかも

コンソール起動時、インメモリでDuckDBを起動しているためどこかにファイルが残るということがない

ローカルを汚したくない場合の手段の1つとして
