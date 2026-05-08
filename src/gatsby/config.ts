// For gatsby-remark-related-posts
export const remarkRelatedPostsOptions = {
  doc_lang: "ja", // optional
  target_node: "MarkdownRemark", // optional
  getMarkdown: (node: Queries.MarkdownRemark) => node.rawMarkdownBody, // optional
  each_bow_size: 20, // optional
}

// For gatsby-plugin-feed
type FeedSerializeProps = {
  query: {
    site: Queries.Site
    allMarkdownRemark: {
      edges: {
        node: Queries.MarkdownRemark
      }[]
    }
  }
}
export const feedOptions = {
  query: `
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          site_url: siteUrl
        }
      }
    }
  `,
  feeds: [
    {
      serialize: ({ query: { site, allMarkdownRemark } }: FeedSerializeProps) => {
        return allMarkdownRemark.edges.map(edge => {
          return Object.assign({}, edge.node.frontmatter, {
            description: edge.node.excerpt,
            date: edge.node.frontmatter.date,
            url: site.siteMetadata!.siteUrl + edge.node.fields.slug,
            guid: site.siteMetadata!.siteUrl + edge.node.fields.slug,
            custom_elements: [{ "content:encoded": edge.node.html }],
          })
        })
      },
      query: `{
  allMarkdownRemark(sort: {frontmatter: {date: DESC}} filter: { fields: {collection: {eq: "blog"}}}) {
    edges {
      node {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
}`,
      output: "/rss.xml",
      title: "swfz[:memo]'s RSS Feed",
    },
  ],
}
