import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"

import Search from "./search"

const Navigation: React.FC = () => {
  const searchIndices = [{ name: `til`, title: `Pages` }]

  const { site } = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <nav className="flex h-14 justify-center bg-blue-muted text-gray-200" aria-label="main navigation">
      <a className="h-full hover:text-gray-200" href="/">
        <div className="p-4 font-bold">{site.siteMetadata.title}</div>
      </a>

      <Link className="hover:bg-white hover:text-gray-200" to={`/tags`}>
        <div className="p-4">Tags</div>
      </Link>

      <div className="flex grow"></div>

      <div className="hidden md:contents">
        <Search indices={searchIndices}></Search>
      </div>
    </nav>
  )
}

export default Navigation
