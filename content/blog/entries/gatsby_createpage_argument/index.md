---
title: GatsbyでpageQueryに任意のパラメータを渡す
date: "2020-09-10"
description: "createPage"
tags:
  - Gatsby
  - JavaScript
  - GraphQL
---

Gatsbyで動的ページを生成する際にGraphQLで問い合わせするクエリも変数を渡したいというパターンはよくある

ググっても出てこないなーなんて思ってたらよく読むとドキュメントに書いてあった

[Gatsby Node APIs | Gatsby](https://www.gatsbyjs.com/docs/node-apis/#createPages)

```javascript
          // The context data can also be used as
          // arguments to the page GraphQL query.
```

とあり、`createPage`でページを生成するときに`context`としてデータを渡してあげるとその変数をGraphQLのクエリでも参照できる

サンプルを一部抜粋する

- gatsby-node.js

```javascript
    const startDate = moment(`${year}-01-01`).format("YYYY-MM-DD")
    const endDate = moment(`${year}-01-01`).add(1, 'years').format("YYYY-MM-DD")
    createPage({
      path: `/archives/${year}`,
      component: archiveTemplate,
      context: {
        year: year,
        startDate: startDate,
        endDate: endDate
      }
    })
```

- archive.tsx

```typescript
export const pageQuery = graphql`
  query($startDate: Date, $endDate: Date) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $startDate, lt: $endDate }}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
    }
  }
`
```

context.startDate, context.endDateをpageQueryで参照している



