---
title: "gsutilで特定バケット以下のすべてのファイルを別バケットへコピーする"
date: "2023-09-07"
description: "ファイル移動と同様"
tags:
  - GoogleCloudPlatform
  - GCS
  - gsutil
---

```shell
gsutil -m cp -r 'gs://old-bucket/*' gs://new-bucket
```

`-m`はgsutilのオプションで並列実行

`*`を入れないと同じディレクトリ構成にならない（シェルでの操作と同様）

```
new-bucket/old-bucket
```

という感じでディレクトリが作成されてしまう
