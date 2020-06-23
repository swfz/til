import React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"


const Navigation: React.FC = () => {
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
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      {site.siteMetadata.title}
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link className="navbar-item" to={`/tags`}>
        Tags
      </Link>
    </div>
  </div>
</nav>
  )
}

export default Navigation
