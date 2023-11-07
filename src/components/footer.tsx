import { default as React } from "react"

const Footer = () => {
  return (
    <footer className="flex h-10 items-center justify-center bg-blue-muted-600 text-gray-200">
      <div>© {new Date().getFullYear()}. swfz</div>
    </footer>
  )
}

export default Footer
