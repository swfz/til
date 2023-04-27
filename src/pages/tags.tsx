import { Link, graphql, PageProps, HeadFC } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"

import SEO from "../components/seo"

const TagsPage: React.FC<PageProps<Queries.TagsQuery>> = ({ data }) => {
  const group = data.allMarkdownRemark.group

  return (
    <div>
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

export const Head: HeadFC<Queries.TagsQuery> = props => {
  const title = props.data.site?.siteMetadata?.title || ""
  return <SEO title={title} />
}
