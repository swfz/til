import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { ArchiveQueryQuery } from "../../types/graphql-types"

const Archive: React.FC = () => {
  const data: ArchiveQueryQuery = useStaticQuery(graphql`
    query ArchiveQuery {
      allMarkdownRemark(limit: 2000) {
        edges {
          node {
            frontmatter {
              date(formatString: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  `)

  const archives = data.allMarkdownRemark.edges.reduce((acc, cur) => {
    const date = cur.node.frontmatter.date
    const [year, month] = date.split('-')
    acc[year] = acc?.[year] ?? {}
    acc[year][month] = acc?.[year]?.[month] ?? []
    acc[year][month].push(cur)
    return acc
  }, {})

  return (
    <>
      <p>Archives</p>
      {Object.entries(archives).map(([year, items]) => (
        <details key={year}>
          <summary>
            <Link to={`/archives/${year}`}>
              {year}({Object.entries(items).reduce((acc, [_, v]) => acc + v.length, 0)})
            </Link>
          </summary>
          <ul>
            {Object.entries(items).map(([month, items]) => (
              <li key={`${year}-${month}`}>
                <Link to={`/archives/${year}/${month}`}>
                  {year}-{month}({items.length})
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </>
  )
}

export default Archive
