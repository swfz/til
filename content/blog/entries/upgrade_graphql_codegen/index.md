---
title: "graphql-codegenのアップグレードに関するエラー対応"
date: "2021-06-29"
description: "requireResolverForResolveType"
tags:
  - Gatsby
  - GraphQL
---

Gatsbyで使っている`gatsby-plugin-graphql-codegen`のバージョンを上げるにあたってビルドエラーに遭遇したのでその対応のメモ

- バージョン

```
2.7.1 -> 3.0.0
```

単純には上げさせてもらえなかった

- エラー1

```
Objects are not valid as a React child (found: Error: Type "Node" is missing a "__resolveType" resolver. Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this error.). If you meant to render a collection of children, use an array instead.
```

`codegenConfig`に追加で回避

- gatsby-config.js

```diff
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`,
+        codegenConfig: {
+          resolverValidationOptions: {
+            requireResolversForResolveType: false
+          }
        }
```

この辺を見て設定方法を把握して解決

[gatsby-plugin-graphql-codegen | Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-graphql-codegen/)

- エラー2

```
ERROR
GraphQLDocumentError: Unknown fragment "GatsbyImageSharpFixed". at /home/user/til/src/components/bio.tsx:5:12
AggregateError: GraphQLDocumentError: Unknown fragment "GatsbyImageSharpFixed".

error Command failed with exit code 1. 
```

`GatsbyImageSharpFixed`がないとのこと

次のissueをさっと読んだところ個別に書けとのこと

[Why ...GatsbyImageSharpFixed is unknown fragment in GraphiQL? · Issue #9882 · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/issues/9882)


```diff
       avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
         childImageSharp {
           fixed(width: 50, height: 50) {
-            ...GatsbyImageSharpFixed
+            base64
+            width
+            height
+            src
+            srcSet
           }
         }
       }
```

無事バージョンを上げることができた
