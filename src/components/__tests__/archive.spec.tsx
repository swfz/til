import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import renderer from "react-test-renderer"

import { ArchiveList } from "../archive"

beforeAll(() => {
  // 2021-03-10T15:00:00.000Z
  const mockDate = new Date(1615388400000)
  vi.spyOn(global, "Date").mockImplementation(() => mockDate)
  global.Date.now = vi.fn(() => mockDate.getTime());
})

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
    const { getAllByLabelText, getAllByTestId } = render(<ArchiveList data={data}></ArchiveList>)

    // 記事件数と順番があっているか
    const yearLinkList = getAllByLabelText("year-link")
    expect(yearLinkList).toHaveLength(2)
    expect(yearLinkList[0]).toHaveTextContent("2021(3)")
    expect(yearLinkList[1]).toHaveTextContent("2020(4)")

    expect(yearLinkList[0]).toBeVisible()
    expect(yearLinkList[1]).toBeVisible()

    // 初回レンダリング時に現在の年のリストが展開された状態で表示されているか
    const monthLInkList = getAllByLabelText("month-link")
    expect(monthLInkList).toHaveLength(3)
    expect(monthLInkList[0]).toHaveTextContent("2021-01(3)")
    expect(monthLInkList[1]).toHaveTextContent("2020-12(3)")
    expect(monthLInkList[2]).toHaveTextContent("2020-11(1)")

    expect(monthLInkList[0]).toBeVisible()
    expect(monthLInkList[1]).not.toBeVisible()
    expect(monthLInkList[2]).not.toBeVisible()

    // +ボタンクリック後にリストが閉じた状態になっているか
    const plusText2021 = getAllByTestId("year")[0]
    await user.click(plusText2021)

    expect(monthLInkList[0]).not.toBeVisible()
    expect(monthLInkList[1]).not.toBeVisible()
    expect(monthLInkList[2]).not.toBeVisible()

    // 2020年のリストクリック時に展開された状態になっているか
    const plusText2020 = getAllByTestId("year")[1]
    await user.click(plusText2020)

    expect(monthLInkList[0]).not.toBeVisible()
    expect(monthLInkList[1]).toBeVisible()
    expect(monthLInkList[2]).toBeVisible()
  })
  it("snapshot", () => {
    const tree = renderer.create(<ArchiveList data={data}></ArchiveList>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
