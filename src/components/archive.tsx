import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { ArchiveQueryQuery } from "../../types/graphql-types"

const ArchiveContainer = () => {
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

  return <Archive data={data}></Archive>
}

export const Archive: React.FC = ({ data }) => {
  const archives = data.allMarkdownRemark.edges.reduce((acc, cur) => {
    const date = cur.node.frontmatter.date
    const [year, month] = date.split("-")
    acc[year] = acc?.[year] ?? {}
    acc[year][month] = acc?.[year]?.[month] ?? []
    acc[year][month].push(cur)
    return acc
  }, {})

  const descFn = (a, b) => {
    if (a[0] > b[0]) {
      return -1
    } else {
      return 1
    }
  }

  return (
    <>
      <p>Archive</p>
      {Object.entries(archives)
        .sort(descFn)
        .map(([year, items]) => (
          <details open={true} key={year}>
            <summary>
              +
              <Link aria-label={"year-link"} to={`/archives/${year}`}>
                {year}(
                {Object.entries(items).reduce(
                  (acc, [_, v]) => acc + v.length,
                  0
                )}
                )
              </Link>
            </summary>
            <ul>
              {Object.entries(items)
                .sort(descFn)
                .map(([month, items]) => (
                  <li aria-label={"month-link"} key={`${year}-${month}`}>
                    <Link to={`/archives/${year}/${month}`}>
                      <p>
                        &nbsp;&nbsp;&nbsp;{year}-{month}({items.length})
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          </details>
        ))}
    </>
  )
}

export default ArchiveContainer
