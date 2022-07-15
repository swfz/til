import React from "react"
import { graphql, PageProps } from "gatsby"
import { AllMarkdownQuery } from "../../types/graphql-types"
import SEO from "../components/seo"
import Line from "../components/line"

const BlogIndex: React.FC<PageProps<AllMarkdownQuery>> = ({ data }) => {
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`
