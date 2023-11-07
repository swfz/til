import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"

type Tag = {
  fieldValue: string | null
  totalCount: number
}

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <span className="flex flex-row flex-wrap gap-1">
      {tags.map(tag => (
        <Link key={tag.fieldValue} className="tag" to={`/tags/${kebabCase(tag?.fieldValue || "")}/`}>
          {tag.fieldValue} ({tag.totalCount})
        </Link>
      ))}
    </span>
  )
}

export default Tags
