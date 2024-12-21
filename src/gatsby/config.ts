type Data = {
  data: {
    postsRemark: {
      edges: {
        node: Queries.MarkdownRemark
      }[]
    }
  }
}

const escapeStringRegexp = (str: string): string => {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string")
  }

  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g

  return str.replace(matchOperatorsRe, "\\$&")
}
const pagePath = `content/blog`

const algoliaQuery = `
{
  postsRemark: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          date
          title
          tags
          description
        }
        fields {
          slug
        }
        internal {
          contentDigest
        }
        rawMarkdownBody
        timeToRead
      }
    }
  }
}`

const pageToAlgoliaRecord = ({
  node: { id, frontmatter, fields, rawMarkdownBody, ...rest },
}: {
  node: Queries.MarkdownRemark
}) => {
  return {
    objectID: id,
    url: `https://til.swfz.io/${fields.slug}`,
    github: `https://github.com/swfz/til/blob/master/content/blog/${fields.slug}index.md`,
    text: rawMarkdownBody,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const dataTransformer = ({ data }: Data) => {
  console.log(`markdownRemark: ${data.postsRemark.edges.length} Records`)

  return data.postsRemark.edges.map(pageToAlgoliaRecord)
}

export const queries = [
  {
    query: algoliaQuery,
    transformer: dataTransformer,
    indexName: process.env.ALGOLIA_INDEX_NAME, // overrides main index name, optional
    settings: {
      attributesToSnippet: [`text:50`],
      attributesForFaceting: [`tags`],
    },
  },
]

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
