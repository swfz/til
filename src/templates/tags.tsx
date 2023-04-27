import { Link, graphql, PageProps } from "gatsby"
import React from "react"

import Line from "../components/line"
import SEO from "../components/seo"

type PageContext = {
  tag: string
}

const Tags: React.FC<
  PageProps<Queries.MarkdownRemarkByTagQuery, PageContext>
> = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <>
      <SEO title="All posts" />
      <div>
        <h1 className="subtitle">{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const slug = node?.fields?.slug || ""
            return <Line key={slug} node={node}></Line>
          })}
        </ul>
        <Link to="/tags">All tags</Link>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query MarkdownRemarkByTag($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
            description
          }
        }
      }
    }
  }
`

export default Tags
