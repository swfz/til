// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-coy.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "./styles.scss"

import { default as React } from "react"

import Layout from "./components/layout"

import type { GatsbyBrowser, GatsbySSR } from "gatsby"

type WrapPageElement = GatsbyBrowser["wrapPageElement"] | GatsbySSR["wrapPageElement"]

// FIXME: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const wrapPageElement: WrapPageElement = ({ element, props }: any) => {
  return <Layout {...props}>{element}</Layout>
}
