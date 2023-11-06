// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism-coy.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "./styles.scss"

import { default as React } from "react"

import Layout from "./components/layout"

import type { GatsbyBrowser, GatsbySSR, WrapPageElementNodeArgs } from "gatsby"

type WrapPageElement = GatsbyBrowser["wrapPageElement"] | GatsbySSR["wrapPageElement"]

export const wrapPageElement: WrapPageElement = ({ element, props }: WrapPageElementNodeArgs) => {
  return <Layout {...props}>{element}</Layout>
}
