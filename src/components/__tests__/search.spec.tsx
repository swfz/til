import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import React from "react"
import { act } from "react-dom/test-utils"

import { handlers } from "../../mocks/handler"
import Search from "../search/index"

describe("Search", () => {
  const user = userEvent.setup()
  const server = setupServer(...handlers)

  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    server.close()
  })

  it("検索UIのテスト", async () => {
    const { baseElement, container, getByTestId, getAllByTestId, getByTitle, getByPlaceholderText } = render(
      <Search indices={[{ name: "til" }]}></Search>
    )
    const searchButton = getByTitle("Submit the search query")

    expect(container).toMatchSnapshot()
    expect(searchButton).toBeVisible()
    const searchInput = getByPlaceholderText("Search")

    await user.click(searchButton)
    user.type(searchInput, "Bi")

    // 検索入力後すぐはリクエストが送信されないので結果が返ってきていない状態
    expect(getByTestId("search-result-count")).toHaveTextContent("0 results")
    expect(getByTestId("search-result")).not.toBeVisible()

    // 1秒後にリクエスト、レンダリングされるので2秒まってレンダリングされたかの確認
    await act(async () => {
      await new Promise(r => setTimeout(r, 2000))
    })
    expect(getByTestId("search-result-count")).toHaveTextContent("41 results")
    expect(getAllByTestId("search-result-item").length).toEqual(20)
    expect(container).toMatchSnapshot()

    // Query内容が変わったとき、すぐにはリクエストが送信されないため変更なし
    user.type(searchInput, "g")
    expect(getByTestId("search-result-count")).toHaveTextContent("41 results")
    expect(getAllByTestId("search-result-item").length).toEqual(20)

    // 入力が終わったと判断され、新たにリクエスト送信。検索結果にも反映されているかの確認
    await act(async () => {
      await new Promise(r => setTimeout(r, 2000))
    })
    expect(getByTestId("search-result-count")).toHaveTextContent("12 results")
    expect(getAllByTestId("search-result-item").length).toEqual(12)
    expect(container).toMatchSnapshot()

    // 外側をクリックで検索結果が非表示になる
    await user.click(baseElement)
    expect(getByTestId("search-result")).not.toBeVisible()
    expect(container).toMatchSnapshot()
  })
})
