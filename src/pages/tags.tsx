import React from "react"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { Link, graphql, PageProps } from "gatsby"
import { TagsQuery } from "../../types/graphql-types"

const TagsPage: React.FC<PageProps<TagsQuery>> = ({ data }) => {
  const title = data.site?.siteMetadata?.title || ""
  const group = data.allMarkdownRemark.group

  return (
    <div>
      <Helmet title={title} />
      <div>
        <h1 className="subtitle">Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag?.fieldValue || "")}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
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
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage
