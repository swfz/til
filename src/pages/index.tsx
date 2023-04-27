import { graphql, PageProps } from "gatsby"
import React from "react"

import Line from "../components/line"
import SEO from "../components/seo"

const BlogIndex: React.FC<PageProps<Queries.AllMarkdownQuery>> = ({ data }) => {
  const posts = data.allMarkdownRemark?.edges

  return (
    <>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        return <Line key={node?.fields?.slug} node={node}></Line>
      })}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query AllMarkdown {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            tags
          }
        }
      }
    }
  }
`
