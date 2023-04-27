import { Link, graphql, PageProps } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"
import { Helmet } from "react-helmet"

const TagsPage: React.FC<PageProps<Queries.TagsQuery>> = ({ data }) => {
  const title = data.site?.siteMetadata?.title || ""
  const group = data.allMarkdownRemark.group

  return (
    <div>
      <Helmet title={title} />
      <div>
        <h1 className="subtitle">Tags</h1>
        <span className="tags">
          {group.map(tag => (
            <Link
              key={tag.fieldValue}
              className="tag is-link is-light"
              to={`/tags/${kebabCase(tag?.fieldValue || "")}/`}
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          ))}
        </span>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query Tags {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage
