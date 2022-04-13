import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Archive } from "../archive"
import renderer from "react-test-renderer"

describe("Archive", () => {
  const user = userEvent.setup()
  const data = {
    allMarkdownRemark: {
      edges: [
        { node: { frontmatter: { date: "2021-01-11" } } },
        { node: { frontmatter: { date: "2021-01-20" } } },
        { node: { frontmatter: { date: "2021-01-25" } } },
        { node: { frontmatter: { date: "2020-12-28" } } },
        { node: { frontmatter: { date: "2020-12-20" } } },
        { node: { frontmatter: { date: "2020-12-15" } } },
        { node: { frontmatter: { date: "2020-11-10" } } },
      ],
    },
  }
  it("renders correctly", async () => {
    const { getAllByText, getAllByLabelText } = render(
      <Archive data={data}></Archive>
    )

    // 記事件数と順番があっているか
    const yearLinkList = getAllByLabelText("year-link")
    expect(yearLinkList).toHaveLength(2)
    expect(yearLinkList[0]).toHaveTextContent("2021(3)")
    expect(yearLinkList[1]).toHaveTextContent("2020(4)")

    expect(yearLinkList[0]).toBeVisible()
    expect(yearLinkList[1]).toBeVisible()

    // 初回レンダリング時にリストが展開された状態で表示されているか
    const monthLInkList = getAllByLabelText("month-link")
    expect(monthLInkList).toHaveLength(3)
    expect(monthLInkList[0]).toHaveTextContent("2021-01(3)")
    expect(monthLInkList[1]).toHaveTextContent("2020-12(3)")
    expect(monthLInkList[2]).toHaveTextContent("2020-11(1)")

    expect(monthLInkList[0]).toBeVisible()
    expect(monthLInkList[1]).toBeVisible()
    expect(monthLInkList[2]).toBeVisible()

    // +ボタンクリック後にリストが閉じた状態になっているか
    const plusText2021 = getAllByText(/\+/i)[0]
    await user.click(plusText2021)

    expect(monthLInkList[0]).not.toBeVisible()
    expect(monthLInkList[1]).toBeVisible()
    expect(monthLInkList[2]).toBeVisible()

    const plusText2020 = getAllByText(/\+/i)[1]
    await user.click(plusText2020)

    expect(monthLInkList[0]).not.toBeVisible()
    expect(monthLInkList[1]).not.toBeVisible()
    expect(monthLInkList[2]).not.toBeVisible()
  })
  it("snapshot", () => {
    const tree = renderer.create(<Archive data={data}></Archive>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
