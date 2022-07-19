import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Search from "./search"
import SearchV2 from "./searchv2"

const Navigation: React.FC = () => {
  const searchIndices = [{ name: `til`, title: `Pages` }]

  const { site } = useStaticQuery(
    graphql`
      query Layout {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div
      className="navbar has-background-info-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item has-text-grey-lighter" href="/">
          <span
            style={{
              fontWeight: `bold`,
            }}
          >
            {site.siteMetadata.title}
          </span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item has-text-grey-lighter" to={`/tags`}>
            Tags
          </Link>
        </div>
      </div>

      {/* <Search indices={searchIndices}></Search> */}
      <SearchV2 indices={searchIndices}></SearchV2>
    </div>
  )
}

export default Navigation
