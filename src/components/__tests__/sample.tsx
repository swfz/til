import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React from "react"

const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

describe("Bio", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Title />)
    expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  })
})
