import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ActionMenu } from "./action-menu";

// Mock the hook
const mockUpdateStatus = vi.fn();
vi.mock("@/features/users/hooks/use-update-user-status", () => ({
  useUpdateUserStatus: () => ({
    mutate: mockUpdateStatus,
  }),
}));

// Mock Link
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Dropdown Menu components to avoid complex Radix interactions in unit test
vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="trigger">{children}</button>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content">{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onSelect,
  }: {
    children: React.ReactNode;
    onSelect?: () => void;
  }) => (
    <div
      data-testid="item"
      onClick={onSelect}
      // Add simplified role for userEvent click if needed, but div with onClick usually works
    >
      {children}
    </div>
  ),
}));

describe("ActionMenu Component", () => {
  const defaultProps = {
    userId: "123",
    trigger: <span>Open</span>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders trigger correctly", () => {
    render(<ActionMenu {...defaultProps} />);
    expect(screen.getByTestId("trigger")).toHaveTextContent("Open");
  });

  it("calls updateStatus with 'Blacklisted' when Blacklist User is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionMenu {...defaultProps} />);

    // Simulate opening menu (our mock renders content always, but in real life we'd click trigger)
    // With our mock structure, items are rendered immediately inside Content

    const items = screen.getAllByTestId("item");
    // Find the one with "Blacklist User" text
    const blacklistBtn = items.find((item) =>
      item.textContent?.includes("Blacklist User"),
    );

    if (blacklistBtn) {
      await user.click(blacklistBtn);
      expect(mockUpdateStatus).toHaveBeenCalledWith("Blacklisted");
    } else {
      throw new Error("Blacklist button not found");
    }
  });

  it("calls updateStatus with 'Active' when Activate User is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionMenu {...defaultProps} />);

    const items = screen.getAllByTestId("item");
    const activateBtn = items.find((item) =>
      item.textContent?.includes("Activate User"),
    );

    if (activateBtn) {
      await user.click(activateBtn);
      expect(mockUpdateStatus).toHaveBeenCalledWith("Active");
    } else {
      throw new Error("Activate button not found");
    }
  });

  it("renders View Details link", () => {
    render(<ActionMenu {...defaultProps} />);
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });
});
