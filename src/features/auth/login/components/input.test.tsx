import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders correctly with default props", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");
    // User type simulates real typing
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("renders with right element when provided", () => {
    render(<Input rightElement={<span data-testid="icon">Icon</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <Input className="custom-input" containerClassName="custom-container" />,
    );
    const input = screen.getByRole("textbox");
    // Note: implementation wraps input in a div with containerClassName
    expect(input).toHaveClass("custom-input");
  });
});
