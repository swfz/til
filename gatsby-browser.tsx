// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-coy.css"
import "./src/styles.scss"

import { default as React, ReactNode } from "react"
import Layout from "./src/components/layout"

const startWorker = async () => {
  const { worker } = require("./src/mocks/browser")
  await worker.start({
    ServiceWorker: {
      url: "/pixela-mock",
    },
  })
}

export const onClientEntry = () => {
  if (process.env.NODE_ENV === "development") {
    startWorker()
  }
}

const wrapElement = ({
  element,
  props,
}: {
  element: ReactNode
  props: object
}) => {
  return <Layout {...props}>{element}</Layout>
}

export { wrapElement as wrapPageElement }
