---
title: "WSL2のデフォルトユーザーではないユーザーでホストのコマンドを使う"
date: "2024-12-21"
description: "解決できず"
tags:
  - WSL2
  - wslu
---

WSLにおいて、複数ユーザーを作ってプライベート用と仕事用のアカウント認証情報などを分けられないかと考えた

WSLは初回起動時にデフォルトユーザーを作成するが、このデフォルトユーザー以外にもインスタンス起動後にユーザーを作成してみた

そして

- wsluの`wslview`コマンドでブラウザを起動
- `copy.exe`でクリップボードコピー

などをしようとしたが、うまくいかなかったのでやったログだけ残す

以降デフォルトユーザーは`hoge`、新たに作成したユーザーは`newuser`として話を進める

## wsluを入れてブラウザ起動する

```
apt install wslu
```

```
wslview https://google.com
```

エラー…

## ユーザー違い

動いたのはデフォルトユーザーの`hoge`、`newuser`では動かなかった…

wslviewがというより普通のコマンドも使えない…


- エラー出力の抜粋

```
/mnt/c/WINDOWS/system32/clip.exe: Invalid argument
```

権限問題のよう…

```bash
$ id  
uid=1001(newuser) gid=1001(newuser) groups=1001(newuser),27(sudo),100(users)  
  
~/memo (git)-[master]  
$ ls -l /mnt/c/WINDOWS/system32/clip.exe  
-r-xr-xr-x 2 hoge hoge 32768 Dec 7 2019 /mnt/c/WINDOWS/system32/clip.exe*
```

なるほどねぇ…`/mnt/c/`以下（Windows領域へのアクセスはデフォルトユーザー、もしくはそのグループから）という権限設定がなされているのか…

ちょっと気持ち悪いが…

```
$ sudo usermod -aG hoge newuser
```

でデフォルトユーザーのグループに新規のユーザーを追加させた


```
$ groups newuser  
newuser : newuser sudo users hoge
```

```
wsl --shutdown
```

再起動してから確認

```
$ wslview https://google.com  
"GetEncoding" のオーバーロードで、引数の数が "0" であるものが見つかりません。  
発生場所 行:1 文字:59  
+ ... ing]::UTF8; [Console]::InputEncoding = [System.Text.Encoding]::GetEnc ...  
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
+ CategoryInfo : NotSpecified: (:) [], MethodException  
+ FullyQualifiedErrorId : MethodCountCouldNotFindBest
```

何かいわれたけど起動はした…

## WSLでのWindows領域の権限

[WSL での詳細設定の構成 | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/wsl-config)


この辺を見てみる…

usersグループに権限付けたほうがよいかな


- /etc/wsl.conf

```
[automount]  
options = "uid=1000,gid=100"
```

1000はhoge

100はusers

インスタンスを落として再度確認する

- ホスト側

```
wsl -t Ubuntu-24.04
```

- 確認

```
$ ls -al /mnt/c/WINDOWS/system32/clip.exe  
-r-xr-xr-x 2 hoge users 32768 Dec 7 2019 /mnt/c/WINDOWS/system32/clip.exe*
$ echo 'hoge' | iconv -f UTF-8 -t CP932 | /mnt/c/WINDOWS/system32/clip.exe 
  
$ hoge
```

期待通り

やはり読むべきは公式ドキュメント…

## reg.exeはまだ使えず

- hoge

```
wslview -v  
wslu v4.1.3-1
```

- newuser

```
wslview -v  
/mnt/c/Windows/System32/reg.exe: Invalid argument  
wslu v4.1.3-1
```

reg.exeは`users`でも実行できないよう…

ターミナルの出力結果を`clip.exe`に渡してコピーする運用にしていたのでなんとかしないと…と思っていたが

そもそもtmuxでxclip, xcopyが使えていたのでそちらを使うようにした…

## metadata付与

そして、時間が経つと権限ない系の話になってブラウザが起動しない事態に…正直良くわからん

参考: [WSL2 でパーミッション変更できるかやってみた #Linux - Qiita](https://qiita.com/yuinore/items/281d7b5aca08cbb58473)

権限周りなのでこのへんかな

metadata付与してみた

- /etc/wsl.conf

```ini
[automount]  
options = "metadata,uid=1000,gid=100"
```

- 再起動後確認

```bash
ls -al /mnt/c/Windows/System32/reg.exe
-r-xr-xr-x 2 sawafuji users 77312 Dec  7  2019 /mnt/c/Windows/System32/reg.exe*
```

```bash
echo hoge | /mnt/c/WINDOWS/system32/clip.exe
```

動いた…

## 再発

しかし、時間が経つと動かなくなるみたい?だった…

これWinのスリープと関係あるのかな

## 結論

しばらく試行錯誤してみたが動かないパターンがどうしても発生するため諦めた

WSLのインスタンスにはデフォルトユーザーのみで操作する

ユーザーの切り分けをする場合は別のインスタンスを立てる、という対応にした

同じディストリビューションだったとしても別名をつけることはできたので今のところの運用は別インスタンスにしてそれぞれのケースで利用するという形に落ち着いた

残念…
