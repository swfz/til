/*
* @jest-environment jsdom
*/

import React from "react"
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
// import renderer from "react-test-renderer";
import Line from "../line";
import Bio from "../bio";

const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>;

describe("Bio", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Title />);
    expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!");
  })
})
