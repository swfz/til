import { default as React, ReactNode } from "react"

import Navigation from "../components/navi"

import Archive from "./archive"
import Bio from "./bio"
import Pixela from "./pixela"

interface LayoutProps {
  children: ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Navigation></Navigation>
      <div
        className="columns"
        style={{
          marginBottom: 0,
          paddingTop: `0.5rem`,
        }}
      >
        <div
          className="column is-6 is-offset-one-fifth"
          style={{
            background: `#FFFFFF`,
          }}
        >
          <main>{props.children}</main>
        </div>
        <div
          className="column is-2"
          style={{
            background: `#F9F9F9`,
          }}
        >
          <Bio></Bio>
          <hr />
          <Archive></Archive>
          <hr />
          <Pixela></Pixela>
        </div>
      </div>

      <footer
        className="footer has-text-grey-lighter has-background-info-dark"
        style={{
          padding: `1rem 1.5rem 1rem`,
          width: `100%`,
          bottom: 0,
        }}
      >
        <div className="content has-text-centered">© {new Date().getFullYear()}. swfz</div>
      </footer>
    </>
  )
}

export default Layout
