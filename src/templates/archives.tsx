import React from "react"
import { graphql, PageProps } from "gatsby"

import Line from "../components/line"

import { ArchivesByDateRangeQuery } from "../../types/graphql-types"

type PageContext = {
  year: string
  month: string
}

const ArchivesTemplate: React.FC<
  PageProps<ArchivesByDateRangeQuery, PageContext>
> = ({ data, pageContext }) => {
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <div>
      <div>
        <h1 className="subtitle">
          {pageContext.year}
          {pageContext.month && `-${pageContext.month}`} are {totalCount} posts
        </h1>
        <ul>
          {edges.map(({ node }) => {
            const slug = node?.fields?.slug || ""
            return <Line key={slug} node={node}></Line>
          })}
        </ul>
      </div>
    </div>
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $startDate, lt: $endDate } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
    }
  }
`

export default ArchivesTemplate
