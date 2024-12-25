---
title: "GatsbyでESlint flat config(v9)対応のメモ"
date: "2024-12-10"
description: ""
tags:
  - Gatsby
  - ESLint
---

供養の意味のメモ

前提説明足りないとか全然ありそうだがどこかの誰かの役に立てれば…

Gatsby製の本サイトでRenovate対応の際に試行錯誤したのでそのログの断片

そもそもflat configの対応から必要だった

## migration guide

FlatConfigへのマイグレーションは基本下記読めば良いっぽい

[Configuration Migration Guide - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/configure/migration-guide)

## migrate

- migraterを実行

```bash
$ npx @eslint/migrate-config .eslintrc.json

Need to install the following packages:  
@eslint/migrate-config@1.3.0  
Ok to proceed? (y) y  
  
  
Migrating .eslintrc.json  
  
Wrote new config to ./eslint.config.mjs  
  
You will need to install the following packages to use the new config:  
- @eslint/compat  
- globals  
- @eslint/js  
- @eslint/eslintrc  
  
You can install them using the following command:  
  
npm install @eslint/compat globals @eslint/js @eslint/eslintrc -D
```
これらが必要だからインストールしてねって話らしいのでインストールする

```bash
yarn add install @eslint/compat globals @eslint/js @eslint/eslintrc -D
```

設定ファイルを`eslint.config.mjs`に変えてlint実行!

怒られた

```
TypeError: Key "rules": Key "valid-jsdoc": Could not find "valid-jsdoc" in plugin "@".
```

[valid-jsdoc - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/rules/valid-jsdoc)

`valid-jsdoc`は非推奨になったらしい

valid-jsdoc -> eslint-plugin-jsdoc

```bash
yarn add -D eslint-plugin-jsdoc
```

で再度試すもだめだった

どこかに`valid-jsdoc`が残っている

GPTに聞いたら`extends`で指定しているもので内部的に使っているものがあるかもということだったので…

すべて除外してひとつずつ確認したら`google`ってのが原因のよう

そもそも何のために入れたかすら覚えてないので消しても良い気がする…ということで消した

## 各種プラグインでの対応

とりあえず実行はできるようになったがかなりエラーが出てきた

一部抜粋

```
3:35 error Parse errors in imported module 'gatsby': parserPath or languageOptions.parser is required! (undefined:undefined) import/namespace
```

import系が多い

これ一個ずつ設定方法見に行かないといけないのか…？

[import-js/eslint-plugin-import: ESLint plugin with rules that help validate proper imports.](https://github.com/import-js/eslint-plugin-import)

2024-09-20現在、eslint-plugin-import自体はflat config対応しているようなのでparserが見つからないのは個別設定をちゃんとしろって話かな

違った…

未対応プラグインの方っぽい次の消したらほとんどなくなった

`compat.extends`している下記設定

    // "plugin:import/recommended",
    // "plugin:import/typescript",

てことはこれの話になってくるのか…

<!-- textlint-disable ja-technical-writing/sentence-length -->
- 参考: [eslint-plugin-importをflat configで使うとparserPath or languageOptions.parser is required!エラーが発生する - elecdeer-pub](https://scrapbox.io/elecdeer-pub/eslint-plugin-import%E3%82%92flat_config%E3%81%A7%E4%BD%BF%E3%81%86%E3%81%A8parserPath_or_languageOptions.parser_is_required!%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E7%99%BA%E7%94%9F%E3%81%99%E3%82%8B)
<!-- textlint-enable ja-technical-writing/sentence-length -->

実行して中身見てみた

- sample.mjs
```javascript
import importPlugin from "eslint-plugin-import";
console.log(importPlugin.flatConfigs.recommended)
```

```javascript
{  
  rules: {  
    'import/no-unresolved': 'error',  
    'import/named': 'error',  
    'import/namespace': 'error',  
    'import/default': 'error',  
    'import/export': 'error',  
    'import/no-named-as-default': 'warn',  
    'import/no-named-as-default-member': 'warn',  
    'import/no-duplicates': 'warn'  
  },  
  languageOptions: { ecmaVersion: 2018, sourceType: 'module' },  
  name: 'import/recommended',  
  plugins: { import: { meta: [Object], rules: [Object] } }  
}
```

fixupPluginRulesで引っ張ってきているのは分かるが、recommendedやTypeScriptの設定はどこに入っているんだ…？ プリセットなのか？

ちょっと調べる気力がなくなってしまったので両方消した

## 開発サーバ立ち上げ時のエラー

```
ERROR #98123 WEBPACK.DEVELOP  
  
Generating development JavaScript bundle failed  
  
[eslint]  
/home/user/til/gatsby-browser.tsx  
1:1 error Definition for rule 'valid-jsdoc' was not found valid-jsdoc  
1:1 error Definition for rule 'require-jsdoc' was not found require-jsdoc  
  
/home/user/til/src/components/archive.tsx  
1:1 error Definition for rule 'valid-jsdoc' was not found valid-jsdoc  
1:1 error Definition for rule 'require-jsdoc' was not found require-jsdoc
```

しばらく記事書いていなかったので開発サーバ立てなかったが立てたらエラーが発生するようになっていた…

### Gatsby pluginがあった…

CIが成功しているのはおかしいと思って、CIのコマンドを試したら

gatsby buildは成功する

eslint個別実行も成功する

ということで`yarn dev`だけで起きる問題っぽい

`gatsby-config`を見に行ったら`gatsby-plugin-eslint`を使っていた…

develop時にlinter結果表示してくれるのありがたいけど必須ではないよな

外すか?と考えたが一度見てみることにした

試しに設定を外してyarn devしたら開発サーバを起動できた…ということで出どころは把握

<!-- textlint-disable prh -->
### webpackのloaderを変えてみる
<!-- textlint-enable prh -->

pluginの中身を読んだらただのコールバックの中身を設定するくんだったので変えてみる

ESLintのOptionの渡し方を変えればOKかな？

https://github.com/webpack-contrib/eslint-webpack-plugin

この辺読んで設定する必要がありそう

pluginのコードをそのまま持ってきていったん試す

動かすところまではできた

[webpack-contrib/eslint-webpack-plugin: A ESLint plugin for webpack](https://github.com/webpack-contrib/eslint-webpack-plugin?tab=readme-ov-file#configtype)

よく見ると`configType: 'flat'`とすることでflatconfigに対応してくれるよう

そして`gatsby-plugin-eslint`が他オプションをそのまま渡すような作りになっているのでconfigの項目として渡してもOKそう

### rulesPaths

いくつか試したがだめだった

```
ERROR #98123 WEBPACK.DEVELOP  
  
Generating development JavaScript bundle failed  
  
[eslint] Invalid Options:  
- Unknown options: rulePaths  
- 'rulePaths' has been removed. Please define your rules using plugins.
```

もう少し調べたら、plugin側に`rulePaths`の設定があった

中身見てみたらGatsby用にカスタムルールが作られているよう…

### custom ruleを読み込ませる

pluginからカスタムルールを読み込ませていたがそれを自前でやればOKって話になる

試行錯誤の末動いた…

下記設定ファイルを用意し`eslint.config.mjs`の各種設定項目に反映させる

- gatsby-eslint-custom-rules.mjs

```typescript
import limitedExports from './node_modules/gatsby/dist/utils/eslint-rules/limited-exports-page-templates.js'  
import noAnonymousExports from './node_modules/gatsby/dist/utils/eslint-rules/no-anonymous-exports-page-templates.js'  
const plugin = {
  meta: {
    name: 'gatsby-custom-rules',
    version: '1.0.0',
  },
  rules: {
    'limited-exports': limitedExports,
    'no-anonymous-exports': noAnonymousExports,
  },
}
export default plugin;

```

次の2つのCommitで動くようになった

- [fix: for eslint-webpack-plugin · swfz/til@ab7b4b4](https://github.com/swfz/til/commit/ab7b4b4cbf14b324f2dd3b6666d5f4eb87035d80)
- [feat: add gatsby required rule · swfz/til@080f1a6](https://github.com/swfz/til/commit/080f1a685f5941ebff606acb2054e2a05824abd6)

Gatsbyの開発が活発でrequired ruleの追加されたりしたらそれは検知できないが…まぁないだろう！ と踏んでこのまま決め打ちで行くことにした

<!-- textlint-disable prh -->
Branch作ったつもりで作業してpushしたらmaster fource push野郎になってしまった…疲れている
<!-- textlint-enable prh -->

