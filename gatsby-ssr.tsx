export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "ja" })
}

export { wrapPageElement } from "./src/wrap-page-element"
