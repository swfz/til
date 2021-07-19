import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Line from "../line"

describe("Line", () => {
  it("renders correctly", () => {
    const node = {
      frontmatter: {
        title: "hoge",
        tags: ["A", "B"],
        date: "2021-05-01",
      },
      fields: {
        slug: "/sample_hoge/fuga",
      },
    }
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
})
