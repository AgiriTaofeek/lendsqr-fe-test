/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginForm } from "./login-form";
import * as useLoginModule from "../../hooks/useLogin";

// Mock the dependencies
const mockLogin = vi.fn();

// Create a variable to hold the mock implementation
const useLoginMock = vi.fn();

vi.mock("../../hooks/useLogin", async (importOriginal) => {
  const actual = await importOriginal<typeof useLoginModule>();
  return {
    ...actual,
    useLogin: () => useLoginMock(),
  };
});

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    className,
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
  useRouter: () => ({}),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Default implementation: Idle state
    useLoginMock.mockReturnValue({
      mutate: mockLogin,
      isPending: false,
      isError: false,
    });
  });

  it("renders the login form correctly", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it("can toggle password visibility", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    // Initial state: password hidden
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toHaveTextContent("SHOW");

    // Click toggle
    await user.click(toggleButton);

    // New state: password visible
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(toggleButton).toHaveTextContent("HIDE");
    expect(toggleButton).toHaveAttribute("aria-label", "Hide password");

    // Click again
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /log in/i });
    await user.click(submitButton);

    expect(
      await screen.findByText(/invalid email address/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters/i),
    ).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows error for invalid email format", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    // Type invalid email
    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    expect(
      await screen.findByText(/invalid email address/i),
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows error for short password", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    // Type short password
    await user.type(passwordInput, "123");
    await user.click(submitButton);

    expect(
      await screen.findByText(/password must be at least 6 characters/i),
    ).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login function with correct data when valid", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("reflects loading state correctly", () => {
    // Override mock for loading state
    useLoginMock.mockReturnValue({
      mutate: mockLogin,
      isPending: true,
      isError: false,
    });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /logging in.../i });

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    // Also check the toggle button if it should be disabled (optional but good UI)
    // Based on code: disabled={isPending}
    const toggleButton = screen.getByRole("button", { name: /show password/i });
    expect(toggleButton).toBeDisabled();
  });
});
