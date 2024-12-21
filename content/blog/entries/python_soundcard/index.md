---
title: "PythonのSoundcardで音声の入出力、ファイルでのやり取りをする"
date: "2023-04-18"
description: ""
tags:
  - Python
  - 音声
---

Pythonのsoundcard,soundfileを使って音声ファイルを扱う

前提としてWSL2（Ubuntu）を使っている

WSLgが使えるようになったのでWSL上で音声のやりとりができるようになった

WSLgが用意してくれているサウンドデバイスは1つっぽいので`default_speaker`,`default_mic`で読み込める

- 動作環境

```
$ wsl --version
WSL バージョン: 1.2.0.0
カーネル バージョン: 5.15.90.1
WSLg バージョン: 1.0.51
MSRDC バージョン: 1.2.3770
Direct3D バージョン: 1.608.2-61064218
DXCore バージョン: 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
Windows バージョン: 10.0.19045.2846
```

## ファイルをコマンドライン引数から受け取り、読み込んで音声を出力

```python
import soundcard as sc
import soundfile as sf
import sys

samplerate = 48000
read_wave_path = sys.argv[1]

default_speaker = sc.default_speaker()

with default_speaker.player(samplerate=samplerate) as sp:
    print(f"Reading...({read_wave_path})")
    data, fs = sf.read(read_wave_path)
    print("Playing...\n")
    sp.play(data)
```

## 音声入力からファイルへ保存


```python
import soundcard as sc
import soundfile as sf

samplerate = 48000
recording_sec = 5
filename = 'outfile.wav'

default_mic = sc.default_microphone()

with default_mic.recorder(samplerate=samplerate) as mic:
    print("Recording...")
    data = mic.record(numframes=samplerate*recording_sec)
    print("Saving...\n")
    sf.write(filename, data, samplerate)
```

