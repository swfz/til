import { graphql, PageProps } from "gatsby"
import React from "react"

import Line from "../components/line"
import SEO from "../components/seo"

const BlogIndex: React.FC<PageProps<Queries.AllMarkdownQuery>> = ({ data }) => {
  const posts = data.allMarkdownRemark?.edges

  return (
    <main className="h-full bg-white p-4">
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        return <Line key={node?.fields?.slug} node={node}></Line>
      })}
    </main>
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { fields: { collection: { eq: "blog" } } }) {
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
