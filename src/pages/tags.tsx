import { Link, graphql, PageProps, HeadFC } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"

import SEO from "../components/seo"

type SummarizedTag = {
  [key: string]: {
    count: number
    tags: { fieldValue: string | null; totalCount: number }[]
  }
}

const TagsPage: React.FC<PageProps<Queries.TagsQuery>> = ({ data }) => {
  const group = data.allMarkdownRemark.group

  const categories = group.reduce((acc, tag) => {
    const category =
      data.allCategoriesJson.edges.find(({ node }) => node?.tags?.includes(tag.fieldValue))?.node.name || "Other"

    const row = acc[category] || { count: 0, tags: [] }
    const newData = { count: row.count + tag.totalCount, tags: [...row.tags, tag] }

    return { ...acc, [category]: { ...newData } }
  }, {} as SummarizedTag)

  return (
    <div>
      <div>
        <h1 className="subtitle">Tags</h1>
        {Object.entries(categories)
          .sort((a, b) => a[1].count - b[1].count)
          .map(([category, row]) => (
            <>
              <hr />
              <details key={category} open>
                <summary key={category}>
                  {category} ({row?.count})
                </summary>
                <span className="tags">
                  {row?.tags.map(tag => (
                    <Link
                      key={tag.fieldValue}
                      className="tag is-link is-light"
                      to={`/tags/${kebabCase(tag?.fieldValue || "")}/`}
                    >
                      {tag.fieldValue} ({tag.totalCount})
                    </Link>
                  ))}
                </span>
              </details>
            </>
          ))}
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
    allCategoriesJson(limit: 1000) {
      edges {
        node {
          name
          tags
        }
      }
    }
  }
`

export default TagsPage

export const Head: HeadFC<Queries.TagsQuery> = props => {
  const title = props.data.site?.siteMetadata?.title || ""
  return <SEO title={title} />
}
