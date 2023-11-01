// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-coy.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "./src/styles.scss"

import { default as React, ReactNode } from "react"

import Layout from "./src/components/layout"
import { worker } from "./src/mocks/browser"

const startWorker = async () => {
  await worker.start({})
}

export const onClientEntry = () => {
  if (process.env.NODE_ENV === "development") {
    startWorker()
  }
}

const wrapElement = ({ element }: { element: ReactNode }) => {
  return <Layout>{element}</Layout>
}

export { wrapElement as wrapPageElement }
