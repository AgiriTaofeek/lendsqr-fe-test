import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FilterForm } from "./filter-form";

// Create mock functions outside to reference them in tests
const mockNavigate = vi.fn();
const mockSearch = {};

// Mock Radix UI Popover to simply render its children
vi.mock("@radix-ui/react-popover", () => ({
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the route API
vi.mock("@tanstack/react-router", () => ({
  getRouteApi: () => ({
    useNavigate: () => mockNavigate,
    useSearch: () => mockSearch,
  }),
}));

describe("FilterForm Component", () => {
  const defaultProps = {
    trigger: <button>Filter</button>,
    isPending: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<FilterForm {...defaultProps} />);

    // Check for some key input labels/placeholders
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("calls navigate with form data when submit button is clicked", async () => {
    const user = userEvent.setup();
    render(<FilterForm {...defaultProps} />);

    // Fill in some data
    await user.type(screen.getByLabelText(/username/i), "TestUser");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");

    // Click submit
    const filterBtns = screen.getAllByRole("button", { name: /filter/i });
    const submitBtn = filterBtns[filterBtns.length - 1]; // The actual submit button inside form
    await user.click(submitBtn);

    // Expect navigate to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it("calls navigate with undefined params (clearing filters) when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<FilterForm {...defaultProps} />);

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    await user.click(resetBtn);

    expect(mockNavigate).toHaveBeenCalledWith({
      search: expect.any(Function),
    });

    // We can verify the function passed to search clears keys
    const navigateCall = mockNavigate.mock.calls.find((call) => call[0].search);
    if (!navigateCall) throw new Error("Navigate not called with search param");
    const searchUpdater = navigateCall[0].search;
    const result = searchUpdater({ existing: "value" });

    expect(result).toMatchObject({
      org: undefined,
      status: undefined,
      search: undefined,
    });
  });

  it("disables buttons when pending", () => {
    render(<FilterForm {...defaultProps} isPending={true} />);

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    expect(resetBtn).toBeDisabled();

    // Ideally check submit button too, but we need to find it reliably first.
  });
});
