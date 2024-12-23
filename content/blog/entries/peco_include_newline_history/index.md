---
title: "zsh history searchからの改行の扱い"
date: "2024-12-09"
description: "ケース対応…"
tags:
  - peco
  - ShellScript
  - Zsh
---

自分はzshrc上でpecoを使ってzsh_historyからの検索しているが、実行コマンドに改行が含まれていた場合にうまく実行できない状態だった

いろいろ調べて対応してみた記録

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
とりあえずいったんこうしたって感じなので今のところはベストだがまたうまくいかないケース出てくるかもしれない
<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

## 前提となる設定（before）

- zshrc

```shell
function peco-select-history() {
    local tac
    if which tac > /dev/null; then
        tac="tac"
    else
        tac="tail -r"
    fi
    BUFFER=$(\history -n 1 | \
        eval $tac | \
        peco --query "$LBUFFER")
    CURSOR=$#BUFFER
    zle clear-screen
}
zle -N peco-select-history
bindkey '^r' peco-select-history
```

よくある`Ctrl+r`で履歴検索して実行するやつ

## 改行が含まれるケース
### 行継続

バックスラッシュで行を継続させるよとシェル上では指示して改行して可読性あげるパターン

Actionsとかでワンショットのコマンド考えるときとかこういうのよくやる

例

```bash
echo 'This is a long line hoge' \
| grep "long" \
| awk '{print $NF}'
```

履歴上はこのようになる

```
echo "This is a long line" \\n| grep "long" \\n| awk '{print $NF}'
```

で、普通に実行するとエラーになってしまう

```
grep: \n: No such file or directory
```

- 対応は履歴呼び出し時に置換させる

```bash
sed s'/ \\\\n/ /g'
```

かなり決め打ちではあるがしょうがない…

### スクリプト

```bash
while read -r line; do
    echo "行の内容: $line";
done < /path/to/file
```

シェルスクリプトをそのまま貼り付けて実行するパターン

履歴呼び出し時

```
while read -r line; do\n echo "行の内容: $line"\ndone < /path/to/file
```

実際は下記じゃないと動かない

```
while read -r line; do echo "行の内容: $line"; done < /path/to/file
```

行末に`;`が入るパターンと入らないパターンがあり、入らなくても改行を入れればよしなに解釈してくれるパターンが存在する

そのため決め打ちで変換すると微妙だな…ということで`zle redisplay`+`printf`の組み合わせで、BUFFERに改行込みの表示をさせて貼り付けなり入力した状態と同じ状態を保つことに成功した

## 結果


![alt](peco_include_newline_history01.gif)


## 最終的な設定（after）

- zshrc

```shell
function peco-select-history() {
    local tac
    if which tac > /dev/null; then
        tac="tac"
    else
        tac="tail -r"
    fi
    selected=$(\history -n 1 | \
        eval $tac | \
        peco --query "$LBUFFER" | \
        sed s'/ \\\\n/ /g')
    BUFFER=$(printf "${selected}")
    zle redisplay
    CURSOR=$#BUFFER
}
zle -N peco-select-history
bindkey '^r' peco-select-history
```

## おわり

1つ目の行継続の方も`zle redisplay`+`printf`パターンで解決したかったが、いろいろ試してもBUFFER上に`\`をどうしても表示させられなかったため断念

とりあえずは改行含めたコマンドも履歴から再現できるようになったので快適度は上がった

誰かよい方法知っていたら教えてほしいです…

