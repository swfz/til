import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/extend-expect"

const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

describe("Bio", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Title />)
    expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  })
})
