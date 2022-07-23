import { graphql, PageProps } from "gatsby"
import React from "react"

import SEO from "../components/seo"

const NotFoundPage: React.FC<PageProps<Queries.TitleQuery>> = () => {
  return (
    <>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query Title {
    site {
      siteMetadata {
        title
      }
    }
  }
`
