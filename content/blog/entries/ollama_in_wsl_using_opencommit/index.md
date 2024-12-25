---
title: "OllamaをWSLで使い、コミットメッセージを考えてもらう"
date: "2024-12-12"
description: "自分の環境にはまだ早かった"
tags:
  - Ollama
  - WSL
  - opencommit
---

- 環境

```
WSL2
Ubuntu24.04
```

- /etc/wsl.conf

```ini
[boot]
systemd=true

[wsl2]
memory=16G
swap=0
localhostForwarding=true
nestedVirtualization=true

[interop]
enabled=true
appendWindowsPath=false
```

## Ollama

[Ollama](https://ollama.com/)

前にもちょっとだけDockerで触ってみたけど再度触ってみる

ClaudeからMCPが出てきたのでOllamaと組み合わせたらローカルでいろいろできるかも?と思ったのがきっかけ

機密な情報を扱ってもローカル内で収まるので使いやすい

ということで試してみる

### install

brewも行けるみたいだがmiseでも行けた、もはやすべてのツール類はubiで対応できるようにしてくれたらみんな幸せだよな

- .config/mise/config.toml

```toml
[tools]
ollama = 'latest'
```

```bash
mise i
```

### Ollamaサーバの起動

```bash
$ ollama serve
```

サーバは`127.0.0.1:11434`で起動する

### モデルのPull

```bash
$ ollama pull llama3
```

llama3を使ってみる

リストを確認

```bash
$ ollama list
NAME             ID              SIZE      MODIFIED
llama3:latest    365c0bd3c000    4.7 GB    3 weeks ago
```

### 実行

```
ollama run llama3
```

対話的UIが起動してチャットできる

一部抜粋

```
>>> 日本語喋れるの？
(konnichiwa!) I'd be happy to chat with you in Japanese! 💬 What would you like to talk about? 🤔

>>> 日本語で返信してみて
😊
私は日本語での返信をします！何か質問や話題がありましたら、聞きます！

(Translation: I'll respond in Japanese! If you have any questions or topics, please let me know!) 😊
```

なんともフレンドリー

このくらいのやりとりであれば、そこまで待つことはなくサクサク返信が返ってくる

### APIの実行

パラメータとかは下記

[ollama/docs/api.md at main · ollama/ollama](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-completion)

```
curl http://localhost:11434/api/chat -d '{  
  "model": "llama3",
  "stream": false,  
  "messages": [  
    { "role": "user", "content": "why is the sky blue?" }  
  ]  
}'
```

`stream`ありだと順々レスポンスが返ってくる

CLI作ったりするならfalseのほうが楽かな

Ollama側の準備は整った

## コミットメッセージをローカルLLMで

opencommitを使ってみる

[di-sukharev/opencommit: just a GPT wrapper for git — generate commit messages by an LLM in 1 sec — works best with Claude 3.5 — supports local models too](https://github.com/di-sukharev/opencommit)

### インストール

こちらもmiseでいれた

- .config/mise/config.toml

```toml
[tools]
"npm:opencommit" = 'latest'
```

```bash
mise i
```

### APIエンドポイントの設定

```
oco config set OCO_AI_PROVIDER='ollama' OCO_MODEL='llama3'
```

デフォルトだとcommit確定したらpushもさせようとするらしい、それをOFFする

```
oco config set OCO_GITPUSH=false
```

APIエンドポイントの設定、ローカルのOllamaが起動しているサーバを指定する

```
oco config set OCO_API_URL='http://127.0.0.1:11434/api/chat'  
```

指定がないと次のようなエラーが出てくる

```
oco  
┌ open-commit  
│  
◇ 1 staged files:  
config/mise/config.toml  
│  
◇ ✖ Failed to generate the commit message  
Error: Ollama provider error: Invalid URL  
at OllamaEngine.generateCommitMessage (/home/user/.local/share/mise/installs/npm-opencommit/3.2.2/lib/node_modules/opencommit/out/cli.cjs:40212:13)  
at process.processTicksAndRejections (node:internal/process/task_queues:95:5)  
at async generateCommitMessageByDiff (/home/user/.local/share/mise/installs/npm-opencommit/3.2.2/lib/node_modules/opencommit/out/cli.cjs:45082:27)  
at async generateCommitMessageFromGitDiff (/home/user/.local/share/mise/installs/npm-opencommit/3.2.2/lib/node_modules/opencommit/out/cli.cjs:45293:25)  
at async trytm (/home/user/.local/share/mise/installs/npm-opencommit/3.2.2/lib/node_modules/opencommit/out/cli.cjs:45261:18)  
at async commit (/home/user/.local/share/mise/installs/npm-opencommit/3.2.2/lib/node_modules/opencommit/out/cli.cjs:45458:35)  
│  
└ ✖ Ollama provider error: Invalid URL
```

### テンプレート化

たとえばissue番号を含めたい場合とかこうするみたい

```
oco '#205: $msg’
```

### 実行

適当なリポジトリで適当にステージして実行してみる

実際の差分は下記

[chore(config/mise/config.toml): add opencommit and rust dependencies to the configuration file by swfz · Pull Request #1209 · swfz/dotfiles](https://github.com/swfz/dotfiles/pull/1209/commits/78eede5880f204f16e3602e81c4a0e8d68c3ece5)

miseで管理するツールを増やしただけ

```
oco  
┌ open-commit  
│  
◇ 1 staged files:  
config/mise/config.toml  
│  
◇ 📝 Commit message generated  
│  
└ Generated commit message:  
—————————————————— chore(config/mise/config.toml): add opencommit and rust dependencies to the configuration file  
——————————————————  
│  
◇ Confirm the commit message?  
│ Yes  
│  
◇ ✔ Successfully committed  
│  
└ [feature/add-tools 78eede5] chore(config/mise/config.toml): add opencommit and rust dependencies to the configuration file  
1 file changed, 2 insertions(+)  
  
│  
◇ Do you want to run `git push`?  
│ No  
│  
└ `git push` aborted
```

文言もYes/Noで選択できるみたい

メッセージはあっている

しかし結構時間かかった…（3m17s）

短文のメッセージやりとりはそれなりの速度だったけどopencommitになったら結構時間がかかってしまった

どのようなやりとりをしているかまで追っていないのでわからないが、このままだと厳しいなぁという印象だった

WSLだとチューニングしないと厳しい時間、コミットに3分待たされるのはさすがに苦痛

題材としてコミットメッセージを取り上げてみたが自分の環境だと全然速度が出なかったので環境変わったら再度試してみようかな…という感じだった

他の活用パターンを模索してみたいところ

