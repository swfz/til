import { Link, useStaticQuery, graphql } from "gatsby"
import isNil from "lodash/isNil"
import React from "react"

import { Archives, ArchiveMonth, ArchiveEdges } from "../@types"

type Props = {
  data: Queries.ArchiveQueryQuery
}

const Archive = () => {
  const data: Queries.ArchiveQueryQuery = useStaticQuery(graphql`
    query ArchiveQuery {
      allMarkdownRemark(limit: 2000) {
        edges {
          node {
            frontmatter {
              date
            }
          }
        }
      }
    }
  `)
  return <ArchiveList data={data}></ArchiveList>
}

export const ArchiveList = (props: Props) => {
  const archives = props.data.allMarkdownRemark.edges.reduce((acc, cur) => {
    if (isNil(cur) || isNil(cur.node)) {
      return acc
    }

    const date = cur?.node?.frontmatter?.date || ""
    const [year, month] = date.split("-")

    const ym = acc?.[year]?.[month] ? [...acc[year][month], cur] : [cur]

    const updateValue = { ...acc[year], [month]: ym }

    return { ...acc, [year]: updateValue }
  }, {} as Archives)

  const descFn = (a: [string, ArchiveMonth | ArchiveEdges], b: [string, ArchiveMonth | ArchiveEdges]) => {
    if (a[0] > b[0]) {
      return -1
    } else {
      return 1
    }
  }

  const isOpen = (year: number) => {
    const nowYear = new Date().getFullYear()

    return nowYear === year
  }

  return (
    <>
      <p>Archive</p>
      {Object.entries(archives)
        .sort(descFn)
        .map(([year, items]) => (
          <details open={isOpen(parseInt(year))} key={year}>
            <summary>
              <Link aria-label={"year-link"} to={`/archives/${year}`}>
                {year}({Object.entries(items).reduce((acc, [, v]) => acc + v.length, 0)})
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

export default Archive
