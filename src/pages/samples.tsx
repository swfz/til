import { graphql, PageProps } from "gatsby"
import React from "react"

import Line from "../components/line"

const SamplesPage: React.FC<PageProps<Queries.AllMarkdownQuery>> = ({ data }) => {
  const posts = data.allMarkdownRemark?.edges

  return (
    <main className="h-full bg-white p-4">
      {posts.map(({ node }) => {
        return <Line key={node?.fields?.slug} node={node}></Line>
      })}
    </main>
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
