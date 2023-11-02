import { graphql, PageProps } from "gatsby"
import React from "react"

import Line from "../components/line"
import SEO from "../components/seo"

const SamplesPage: React.FC<PageProps<Queries.AllMarkdownQuery>> = ({ data }) => {
  const posts = data.allMarkdownRemark?.edges

  return (
    <>
      <SEO title="All samples" />
      {posts.map(({ node }) => {
        return <Line key={node?.fields?.slug} node={node}></Line>
      })}
    </>
  )
}

export const pageQuery = graphql`
  query AllMarkdown {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { fields: { collection: { eq: "sample" } } }) {
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

export default SamplesPage
