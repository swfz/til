import React from "react"

import Archive from "./archive"
import Bio from "./bio"
import Pixela from "./pixela"

const Sidebar = () => {
  return (
    <div className="divide-y divide-zinc-300">
      <Bio></Bio>
      <div className="py-4">
        <Archive></Archive>
      </div>
      <div className="py-4">
        <Pixela></Pixela>
      </div>
    </div>
  )
}

export default Sidebar
