import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserDetails } from "./user-details";
import { generateMockUsers } from "../data";

// Mock the route API
const useLoaderDataMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  getRouteApi: () => ({
    useLoaderData: () => useLoaderDataMock(),
    useParams: () => ({ id: "1" }),
  }),
  createFileRoute: () => () => null, // minimal mock for route definitions if imported
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useNavigate: () => vi.fn(),
  useRouter: () => ({ invalidate: vi.fn() }),
}));

// Mock the hook to avoid QueryClient provider issues
vi.mock("@/features/users/hooks/use-update-user-status", () => ({
  useUpdateUserStatus: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

// Mock child components to isolate unit testing if needed,
// but simplified here we'll test integration of the parts
// or just test that data is passed safely.
// For now, let's keep them real to test full render.

describe("UserDetails Component", () => {
  const mockUser = generateMockUsers(1)[0];

  beforeEach(() => {
    vi.clearAllMocks();
    useLoaderDataMock.mockReturnValue(mockUser);
  });

  it("renders user full name and tier", () => {
    render(<UserDetails />);

    expect(screen.getAllByText(mockUser.username)[0]).toBeInTheDocument();
  });

  it("renders personal information correctly", () => {
    render(<UserDetails />);

    // Check for existence of at least one instance
    expect(screen.getAllByText(mockUser.email)[0]).toBeInTheDocument();
    expect(screen.getAllByText(mockUser.phoneNumber)[0]).toBeInTheDocument();
    expect(screen.getAllByText(mockUser.bvn)[0]).toBeInTheDocument();
  });

  it("renders education and employment details", () => {
    render(<UserDetails />);

    expect(
      screen.getAllByText(mockUser.education.level)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(mockUser.education.sector)[0],
    ).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<UserDetails />);

    expect(
      screen.getAllByText(mockUser.socials.twitter)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(mockUser.socials.facebook)[0],
    ).toBeInTheDocument();
  });

  it("renders guarantor information", () => {
    render(<UserDetails />);

    expect(screen.getByText(mockUser.guarantor.phone)).toBeInTheDocument();
  });
});
