import { Link } from "gatsby"
import React from "react"

import { Tags } from "./tags"

type MarkdownNode = {
  frontmatter: Queries.MarkdownRemarkFrontmatter
  fields: {
    slug: string
  }
}
type Props = {
  node: MarkdownNode
} & JSX.IntrinsicAttributes

const Line: React.VFC<Props> = ({ node }) => {
  return (
    <div className="rounded border border-gray-100 p-6 shadow">
      <div className="text-xl">
        <small>[{node.frontmatter.date}]</small>
        <h2 className="pb-2 text-xl">
          <Link className="link" to={node.fields.slug || ""}>
            {node.frontmatter.title}
          </Link>
        </h2>
        <Tags tags={node.frontmatter.tags} />
      </div>
    </div>
  )
}

export default Line
