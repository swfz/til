---
title: "GitHubのコミットコメントでIssueを自動でCloseさせる"
date: "2022-02-16"
description: "そういう機能があった"
tags:
  - GitHub
  - Git
---

プライベートのリポジトリで、デフォルトブランチに対して`fix: #number`というようにコミット時にコメントを書いてpushしたら対象Issueが自動でCloseされた

ちょっと調べてみたがデフォルトでそういう機能があるっぽい

[Autolinked references and URLs - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests)

autolinkは知っていた、commitログにいつも含めてたし活用していた

[Linking a pull request to an issue - GitHub Docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

`close`や`fix`というキーワードに反応して自動で閉じてくれるのは知らなかった

デフォルトブランチのコミットログに対して発動するみたいなので`master`直pushやPR中のコミットログをMergeしたりしたらそのタイミングでCloseされる

ドキュメントには`close #number`とあったが`fix: #number`でもクローズされたので結構マッチする範囲が広いのかな

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
なんにせよ便利ではあるので覚えておこうと思う
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->