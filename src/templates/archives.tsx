import React from "react"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

type Props = {
  data: any
}

const ArchivesTemplate: React.FC<Props> = ({ data, pageContext, location }) => {
  console.log('=================archives');
  console.log(data);
  console.log(location);
  console.log(pageContext);
  return (
    <div>
      {/* <Helmet title={title} /> */}
      <div>
        <h1 className="subtitle">{pageContext.year}{pageContext.month && `-${pageContext.month}`} Archives</h1>
        <ul>
        </ul>
      </div>
    </div>
  )
}

export default ArchivesTemplate