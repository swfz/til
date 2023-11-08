import { default as React } from "react"

import Navigation from "../components/navi"
import Sidebar from "../components/sidebar"

import Footer from "./footer"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <Navigation></Navigation>
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="basis-0 md:basis-3/12"></div>

        <div className="basis-6/12">{props.children}</div>

        <div className="h-1 border border-zinc-100 md:hidden" />
        <div className="basis-2/12 divide-y divide-zinc-100 bg-white p-1 md:bg-gray-100 md:p-2">
          <Sidebar></Sidebar>
        </div>

        <div className="grow"></div>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Layout
