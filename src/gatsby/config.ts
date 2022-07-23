// For gatsby-plugin-algolia
import path from "path"

import { ElementType } from "../@types"
type MarkdownNode = {
  node: ElementType<Queries.AllPostAndTagsQuery["postsRemark"]["edges"]>["node"]
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
        rawMarkdownBody
        timeToRead
      }
    }
  }
}`

const pageToAlgoliaRecord = ({
  node: { id, frontmatter, fields, ...rest },
}: MarkdownNode) => {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

type Data = {
  data: Queries.AllPostAndTagsQuery
}

export const algoliaQueries = [
  {
    query: algoliaQuery,
    transformer: ({ data }: Data) =>
      data.postsRemark.edges.map(pageToAlgoliaRecord),
    indexName: process.env.ALGOLIA_INDEX_NAME, // overrides main index name, optional
    settings: { attributesToSnippet: [`rawMarkdownBody:30`] },
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
      serialize: ({
        query: { site, allMarkdownRemark },
      }: FeedSerializeProps) => {
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
      query: `
        {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
          ) {
            edges {
              node {
                excerpt
                html
                fields { slug }
                frontmatter {
                  title
                  date
                }
              }
            }
          }
        }
      `,
      output: "/rss.xml",
      title: "swfz[:memo]'s RSS Feed",
    },
  ],
}

// For gatsby-plugin-eslint
export const gatsbyRequiredRules = path.join(
  process.cwd(),
  "node_modules",
  "gatsby",
  "dist",
  "utils",
  "eslint-rules"
)
