import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Navigation from "../components/navi"

const Layout = ({ location, title, children }) => {
  return (
    <>
      <Navigation></Navigation>
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
      <footer
        className="footer has-text-grey-lighter has-background-info-dark"
        style={{
          padding: `1rem 1.5rem 1rem`,
          width: `100%`,
          bottom: 0,
        }}
      >
        <div className="content has-text-centered">
          © {new Date().getFullYear()}. swfz
        </div>
      </footer>
    </>
  )
}

export default Layout
