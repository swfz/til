import { graphql, PageProps } from "gatsby"
import React from "react"

import Line from "../components/line"

type PageContext = {
  year: string
  month: string
}

const ArchivesTemplate: React.FC<PageProps<Queries.ArchivesByDateRangeQuery, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <main className="h-full bg-white p-4">
      <div>
        <h1 className="text-2xl">
          {pageContext.year}
          {pageContext.month && `-${pageContext.month}`} are {totalCount} posts
        </h1>
        <ul>
          {edges.map(({ node }) => {
            const slug = node.fields.slug
            return <Line key={slug} node={node}></Line>
          })}
        </ul>
      </div>
    </main>
  )
}

export const pageQuery = graphql`
  query ArchivesByDateRange($startDate: Date, $endDate: Date) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { date: { gte: $startDate, lt: $endDate } }, fields: { collection: { eq: "blog" } } }
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

export default ArchivesTemplate
