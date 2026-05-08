import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import React from "react"
import { act } from "react-dom/test-utils"

import { handlers } from "../../mocks/handler"
import Search from "../search/index"

describe("Search (D1)", () => {
  const user = userEvent.setup()
  const server = setupServer(...handlers)
  const originalProvider = process.env.GATSBY_SEARCH_PROVIDER

  beforeAll(() => {
    process.env.GATSBY_SEARCH_PROVIDER = "d1"
  })

  afterAll(() => {
    if (originalProvider === undefined) {
      delete process.env.GATSBY_SEARCH_PROVIDER
    } else {
      process.env.GATSBY_SEARCH_PROVIDER = originalProvider
    }
  })

  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    server.close()
  })

  it("検索UIのテスト(D1)", { timeout: 15000 }, async () => {
    const { baseElement, container, getByTestId, getAllByTestId, getByTitle, getByPlaceholderText } = render(
      <Search indices={[{ name: "til" }]}></Search>
    )
    const searchButton = getByTitle("Submit the search query")

    expect(container).toMatchSnapshot()
    expect(searchButton).toBeVisible()
    const searchInput = getByPlaceholderText("Search")

    await user.click(searchButton)
    user.type(searchInput, "Bi")

    // 入力直後はリクエスト未送信
    expect(getByTestId("search-result-count")).toHaveTextContent("0 results")
    expect(getByTestId("search-result")).not.toBeVisible()

    // 1秒後にデバウンス、ただし2文字なので trigram で空結果
    await act(async () => {
      await new Promise(r => setTimeout(r, 2000))
    })
    expect(getByTestId("search-result-count")).toHaveTextContent("0 results")

    // 3文字目を入力 → 20件返る
    user.type(searchInput, "g")
    await act(async () => {
      await new Promise(r => setTimeout(r, 2000))
    })
    expect(getByTestId("search-result-count")).toHaveTextContent("20 results")
    expect(getAllByTestId("search-result-item").length).toEqual(20)
    expect(container).toMatchSnapshot()

    // 8文字まで伸ばすと別 fixture (12件)
    user.type(searchInput, "Query")
    await act(async () => {
      await new Promise(r => setTimeout(r, 2000))
    })
    expect(getByTestId("search-result-count")).toHaveTextContent("12 results")
    expect(getAllByTestId("search-result-item").length).toEqual(12)
    expect(container).toMatchSnapshot()

    // 外側クリックで非表示
    await user.click(baseElement)
    expect(getByTestId("search-result")).not.toBeVisible()
    expect(container).toMatchSnapshot()
  })
})
