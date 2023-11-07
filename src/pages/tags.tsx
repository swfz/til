import { graphql, PageProps, HeadFC } from "gatsby"
import React from "react"

import Divider from "../components/divider"
import SEO from "../components/seo"
import { TagsWithCount } from "../components/tags"

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
    <main className="h-full bg-white p-4">
      <h1 className="text-2xl">Tags</h1>
      {Object.entries(categories)
        .sort((a, b) => (a[0] === "Other" ? 1 : b[1].count - a[1].count))
        .map(([category, row]) => (
          <>
            <Divider />
            <details key={category} open>
              <summary key={category}>
                {category} ({row?.count})
              </summary>
              <TagsWithCount tags={row?.tags} />
            </details>
          </>
        ))}
    </main>
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
