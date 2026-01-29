import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ActionMenu } from "./action-menu";

// Mock the hook
const mockUpdateStatus = vi.fn();
vi.mock("@/features/users/hooks/use-update-user-status", () => ({
  useUpdateUserStatus: () => ({
    mutate: mockUpdateStatus,
    isPending: false,
  }),
}));

// Mock Link
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Dropdown Menu components
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
    <button data-testid="item" onClick={onSelect}>
      {children}
    </button>
  ),
}));

// Mock Dialog components
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div role="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
  DialogFooter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock Button
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
  }) => (
    <button onClick={onClick} data-variant={variant}>
      {children}
    </button>
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

  it("opens dialog when Blacklist User is clicked and calls updateStatus on confirmation", async () => {
    const user = userEvent.setup();
    render(<ActionMenu {...defaultProps} />);

    // Click trigger to "open" menu (simulated by rendering)
    // Click Blacklist User item
    const items = screen.getAllByTestId("item");
    const blacklistBtn = items.find((item) =>
      item.textContent?.includes("Blacklist User"),
    );
    if (!blacklistBtn) throw new Error("Blacklist button not found");
    await user.click(blacklistBtn);

    // Verify dialog is open
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // Use role for heading to be specific
    expect(
      screen.getByRole("heading", { name: "Blacklist User" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Are you sure you want to blacklist/i),
    ).toBeInTheDocument();

    // Click confirm button (The one that says "Blacklist" exactly)
    // We restrict to button role to avoid matching other text
    const confirmBtn = screen.getByRole("button", { name: /^Blacklist$/ });
    await user.click(confirmBtn);

    // Verify mutation called
    expect(mockUpdateStatus).toHaveBeenCalledWith(
      "Blacklisted",
      expect.any(Object),
    );
  });

  it("opens dialog when Activate User is clicked and calls updateStatus on confirmation", async () => {
    const user = userEvent.setup();
    render(<ActionMenu {...defaultProps} />);

    // Click Activate User item
    const items = screen.getAllByTestId("item");
    const activateBtn = items.find((item) =>
      item.textContent?.includes("Activate User"),
    );
    if (!activateBtn) throw new Error("Activate button not found");
    await user.click(activateBtn);

    // Verify dialog is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Check for title specifically
    expect(
      screen.getByRole("heading", { name: "Activate User" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Are you sure you want to activate/i),
    ).toBeInTheDocument();

    // Click confirm button (The one that says "Activate" exactly)
    const confirmBtn = screen.getByRole("button", { name: /^Activate$/ });
    await user.click(confirmBtn);

    // Verify mutation called
    expect(mockUpdateStatus).toHaveBeenCalledWith("Active", expect.any(Object));
  });

  it("closes dialog when Cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionMenu {...defaultProps} />);

    // Open Blacklist dialog
    const items = screen.getAllByTestId("item");
    const blacklistBtn = items.find((item) =>
      item.textContent?.includes("Blacklist User"),
    );
    if (!blacklistBtn) throw new Error("Blacklist button not found");
    await user.click(blacklistBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click Cancel
    const cancelBtn = screen.getByText("Cancel");
    await user.click(cancelBtn);

    // Verify dialog is closed (not in document)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(mockUpdateStatus).not.toHaveBeenCalled();
  });
});
