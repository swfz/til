import React from "react"

import kebabCase from "lodash/kebabCase"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"

declare type ElementType<T> = T extends (infer U)[] ? U : never
type MarkdownNode = ElementType<Queries.AllMarkdownQuery["allMarkdownRemark"]["edges"]>

const Line: React.FC<MarkdownNode> = ({ node }) => {
  return (
    <article className="card">
      <header className="card-content">
        <small>[{node?.frontmatter?.date}]</small>
        <h2
          className="subtitle"
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={node?.fields?.slug || ""}>
            {node?.frontmatter?.title}
          </Link>
        </h2>
        <span className="tags">
          {node?.frontmatter?.tags?.map(tag => (
            <Link
              className="tag is-link is-light"
              aria-label={"tag"}
              key={tag}
              to={`/tags/${kebabCase(tag || "")}`}
            >
              {tag}
            </Link>
          ))}
        </span>
      </header>
    </article>
  )
}

export default Line
