import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Wordle Bot header", () => {
    render(<App />);
    const linkElement = screen.getByText(/Wordle Bot/i);
    expect(linkElement).toBeInTheDocument();
});
