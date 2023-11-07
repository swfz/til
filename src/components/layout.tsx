import { default as React } from "react"

import Navigation from "../components/navi"

import Archive from "./archive"
import Bio from "./bio"
import Footer from "./footer"
import Pixela from "./pixela"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <Navigation></Navigation>
      <div className="flex flex-col md:flex-row">
        <div className="basis-0 md:basis-3/12"></div>

        <div className="basis-6/12">{props.children}</div>

        <div className="basis-2/12 bg-gray-100 p-1 md:p-2">
          <Bio></Bio>
          <hr />
          <Archive></Archive>
          <hr />
          <Pixela></Pixela>
        </div>

        <div className="grow"></div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout
