import { graphql, PageProps, HeadFC } from "gatsby"
import React from "react"

import SEO from "../components/seo"
import { TagsWithCount } from "../components/tags"

type SummarizedTag = {
  [key: string]: {
    count: number
    subCategories: {
      [key: string]: {
        count: number
        tags: { fieldValue: string | null; totalCount: number }[]
      }
    }
    tags: { fieldValue: string | null; totalCount: number }[]
  }
}

const TagsPage: React.FC<PageProps<Queries.TagsQuery>> = ({ data }) => {
  const group = data.allMarkdownRemark.group

  const categories = group.reduce((acc, tag) => {
    const categoryNode = data.allCategoriesJson.edges.find(({ node }) => node?.tags?.includes(tag.fieldValue))?.node
    const category = categoryNode?.name || "Other"
    const subCategory = categoryNode?.subCategory || null

    const categoryRow = acc[category] || { count: 0, subCategories: {}, tags: [] }

    if (subCategory) {
      const row = categoryRow.subCategories[subCategory] || { count: 0, tags: [] }
      const newData = { count: row.count + tag.totalCount, tags: [...row.tags, tag] }
      const subCategories = { ...categoryRow.subCategories, [subCategory]: newData }
      const categoryCount = categoryRow.count + tag.totalCount

      return { ...acc, [category]: { ...categoryRow, count: categoryCount, subCategories: subCategories } }
    } else {
      const newData = { count: categoryRow.count + tag.totalCount, tags: [...categoryRow.tags, tag] }
      return { ...acc, [category]: { subCategories: categoryRow.subCategories, ...newData } }
    }
  }, {} as SummarizedTag)

  return (
    <main className="h-full divide-y divide-zinc-100 bg-white p-4">
      <h1 className="pb-4 text-2xl">Tags</h1>
      {Object.entries(categories)
        .sort((a, b) => (a[0] === "Other" ? 1 : b[1].count - a[1].count))
        .map(([category, row]) => (
          <div key={category} className="py-4">
            <details open>
              <summary key={category}>
                {category} ({row?.count})
              </summary>
              {Object.entries(row?.subCategories)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([subCategory, r]) => (
                  <div key={subCategory} className="px-4 py-1">
                    <details open>
                      <summary key={subCategory}>
                        {subCategory} ({r?.count})
                      </summary>
                      <TagsWithCount tags={r.tags} />
                    </details>
                  </div>
                ))}
              <TagsWithCount tags={row?.tags} />
            </details>
          </div>
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
          subCategory
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
