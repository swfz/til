// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-coy.css"
import "./src/styles.scss"

import React from "react"
import Layout from "./src/components/layout"

const startWorker = async() => {
  const { worker } = require('./src/mocks/browser')
  await worker.start({
    ServiceWorker: {
      url: '/pixela-mock'
    }
  })
}

const wrapElement = ({ element, props }) => {
  startWorker()
  return <Layout {...props}>{element}</Layout>
}

export { wrapElement as wrapPageElement }
