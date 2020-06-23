import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Navigation from "../components/navi"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h2 className="title"
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h2>
    )
  }
  return (
    <>
      <Navigation></Navigation>
      <header>{header}</header>
      <main
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          background: `#FFFFFF`,
        }}
      >
        {children}
      </main>
      <footer className="footer has-text-grey-lighter has-background-info-dark"  style={{
        padding: `2rem 1.5rem 2rem`,
        width: `100%`,
        bottom: 0,
        }}>
        <div className="content has-text-centered">
          © {new Date().getFullYear()}. swfz
        </div>
      </footer>
    </>
  )
}

export default Layout
