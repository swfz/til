// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-coy.css"
import "./src/styles.scss"

import React from "react"
import Layout from "./src/components/layout"

const wrapElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export { wrapElement as wrapPageElement }
