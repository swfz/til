import React, { useState, useEffect } from "react"
import fetch from "node-fetch"
import { tippy } from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import DOMPurify from "dompurify"

const Pixela = () => {
  const [pixelaSvg, setPixelaSvg] = useState("")

  useEffect(() => {
    const fetchPixelaSvg = async () => {
      const res = await fetch(
        "https://pixe.la/v1/users/swfz/graphs/til-pageviews?mode=short"
      )
      const html: string = await res.text()

      setPixelaSvg(DOMPurify.sanitize(html))
      tippy(".each-day", { arrow: true })
    }
    fetchPixelaSvg()
  }, [])

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: pixelaSvg,
        }}
      ></div>
      <div
        style={{
          textAlign: `right`,
        }}
      >
        Powered by{" "}
        <a href="https://pixe.la/" target="_blank">
          Pixela
        </a>
      </div>
    </>
  )
}

export default Pixela
