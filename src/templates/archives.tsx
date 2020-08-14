import React from "react"
// Components
import { graphql } from "gatsby"
import Line from "../components/line"

type Props = {
  data: any
}

const ArchivesTemplate: React.FC<Props> = ({ data, pageContext, location }) => {
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <div>
      <div>
        <h1 className="subtitle">{pageContext.year}{pageContext.month && `-${pageContext.month}`} are {totalCount} posts</h1>
        <ul>
          {edges.map(({ node }) => {
            const { slug } = node.fields
            return <Line key={slug} node={node}></Line>
          })}
        </ul>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($startDate: Date, $endDate: Date) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $startDate, lt: $endDate }}}
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