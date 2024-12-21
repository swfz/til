---
title: "yqがバージョンアップで構文変更された"
date: "2021-08-15"
description: "like jq"
tags:
  - yq
---

とある自動化プロセス上で次のようなエラーが発生していた

```
Error: unknown command "r" for "yq"
```

yqのバージョンが4に上がって構文が変わったみたい

よりjqの構文に近い書き方へ変わったとのこと

たしかにv3のときはちょっと書いていて違和感あったのでよさそう

従来のバージョンとの比較があるので移行は難しくないだろう

- 参考

[Upgrading from V3 - yq](https://mikefarah.gitbook.io/yq/upgrading-from-v3)

- ドキュメント

[yq - yq](https://mikefarah.gitbook.io/yq/)

GitHubActionsのworkflowファイルで実際に変更したときの差分

- actions.yml

```diff
-          got=`yq r ./ansible/versions_vars.yml ${{ matrix.role.name }}_version`
+          got=`yq e .${{ matrix.role.name }}_version ./ansible/versions_vars.yml`
           latest=`./.github/workflows/bin/latest-version-${{ matrix.role.type }}.sh ${{ matrix.role.repo }}`

           echo ::set-output name=got::$got
@@ -60,7 +60,8 @@ jobs:

           if [[ "$got" != "$latest" ]]; then
             echo "found ahead versions"
-            yq w -i ./ansible/versions_vars.yml ${{ matrix.role.name }}_version $latest
+            yq e ".${{ matrix.role.name }}_version=\"$latest\"" ./ansible/versions_vars.yml > versions.yml
+            cp versions.yml ./ansible/versions_vars.yml
```
