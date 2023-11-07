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
    <article className="rounded border border-gray-100 p-6 shadow">
      <header className="text-xl">
        <small>[{node.frontmatter.date}]</small>
        <h2 className="text-2xl">
          <Link className="text-blue-muted-600" to={node.fields.slug || ""}>
            {node.frontmatter.title}
          </Link>
        </h2>
        <Tags tags={node.frontmatter.tags} />
      </header>
    </article>
  )
}

export default Line
