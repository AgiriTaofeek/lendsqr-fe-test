import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
    onPageChange: vi.fn(),
    onItemsPerPageChange: vi.fn(),
  };

  it("renders correct pagination info", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/showing/i)).toBeInTheDocument();
    expect(screen.getByText(/out of 100/i)).toBeInTheDocument();
  });

  it("calls onPageChange when page number is clicked", async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} />);
    await user.click(screen.getByText("2"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} />);
    await user.click(screen.getByText(">"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByText("<")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    expect(screen.getByText(">")).toBeDisabled();
  });

  it("calls onItemsPerPageChange when select value changes", async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} />);

    // Instead of firing change event directly, we simulate selecting an option
    // We need to find the select element. Since it has no label, we might find by display value or combobox role.
    // The component uses a native <select>, so role="combobox" usually works, or implicit label.
    // But here, since we have multiple potential comboboxes (if any), let's stick to what worked before but use userEvent.
    // userEvent.selectOptions requires the select element and the values.

    // The previous test found it by display value "10". This returns the <select> if it's the value, or finding option..
    // getByDisplayValue on a select returns the select element.
    const select = screen.getByDisplayValue("10");

    await user.selectOptions(select, "20");

    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledWith(20);
  });

  it("renders simplified view when total items is 0", () => {
    render(<Pagination {...defaultProps} totalItems={0} />);

    expect(screen.getByText(/showing/i)).toBeInTheDocument();
    expect(screen.getByText(/out of 0/i)).toBeInTheDocument();

    // Should not render navigation controls
    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
  });
});
