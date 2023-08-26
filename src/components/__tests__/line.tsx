import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React from "react"
import renderer from "react-test-renderer"

import Line from "../line"

type MarkdownNode = {
  frontmatter: Queries.MarkdownRemarkFrontmatter
  fields: {
    slug: string
  }
}

describe("Line", () => {
  const node: MarkdownNode = {
    frontmatter: {
      title: "hoge",
      tags: ["A", "B"],
      date: "2021-05-01",
      description: "This is Description",
    },
    fields: {
      slug: "/sample_hoge/fuga",
    },
  }
  it("renders correctly", () => {
    const { getByText, getAllByLabelText } = render(<Line node={node}></Line>)

    // タイトルが表示されているか
    const title = getByText("hoge")
    expect(title).toBeInTheDocument()

    // タグが付いているか
    const tags = getAllByLabelText("tag")
    expect(tags.length).toBe(2)

    // 更新日が表示されているか
    const published = getByText(/2021-05-01/i)
    expect(published).toBeInTheDocument()
  })

  it("snapshot", () => {
    const tree = renderer.create(<Line node={node}></Line>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
