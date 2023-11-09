import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import React from "react"

type Tag = {
  fieldValue: string | null
  totalCount: number
}

type TagsWithCountProps = {
  tags: Tag[]
}

export const TagsWithCount = ({ tags }: TagsWithCountProps) => {
  return (
    <span className="flex flex-row flex-wrap gap-1">
      {tags.map(tag => (
        <Link key={tag.fieldValue} aria-label="tag" className="label" to={`/tags/${kebabCase(tag?.fieldValue || "")}/`}>
          {tag.fieldValue} ({tag.totalCount})
        </Link>
      ))}
    </span>
  )
}

type Maybe<T> = T | null
type TagsProps = {
  tags: readonly Maybe<string>[]
}

export const Tags = (props: TagsProps) => {
  return (
    <span className="flex flex-row flex-wrap gap-1">
      {props.tags.map(tag => (
        <Link key={tag} aria-label="tag" className="label" to={`/tags/${kebabCase(tag || "")}/`}>
          {tag}
        </Link>
      ))}
    </span>
  )
}
