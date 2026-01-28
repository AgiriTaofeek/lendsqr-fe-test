import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Users } from "./users";

// Mock dependencies
const mockUseSuspenseQuery = vi.fn();
const mockLoaderData = {
  stats: {
    totalUsers: 100,
    activeUsers: 50,
    usersWithLoans: 20,
    usersWithSavings: 30,
  },
};
const mockSearch = {
  page: 1,
  limit: 10,
};

// Mock @tanstack/react-query
vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSuspenseQuery: () => mockUseSuspenseQuery(),
    useQueryClient: () => ({
      prefetchQuery: vi.fn(),
    }),
    useMutation: () => ({ mutate: vi.fn() }),
  };
});

// Mock @tanstack/react-router
vi.mock("@tanstack/react-router", () => ({
  getRouteApi: () => ({
    useLoaderData: () => mockLoaderData,
    useSearch: () => mockSearch,
    useNavigate: () => vi.fn(),
  }),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useRouter: () => ({ invalidate: vi.fn() }),
}));

// Mock child components to simplify integration test
vi.mock("./stats-grid", () => ({
  StatsGrid: ({ stats }: { stats: any }) => (
    <div data-testid="stats-grid">Total: {stats.totalUsers}</div>
  ),
}));

// We can let UsersTable render or mock it. Let's let it render but mock the data passed to it
// Actually, UsersTable is complex, might be better to verify it receives correct data
// But for integration, let's just mock the hook response and see if things render.
const mockUsersData = {
  data: [
    {
      id: "1",
      username: "TestUser1",
      email: "test1@example.com",
      phoneNumber: "1234567890",
      dateJoined: "2023-01-01",
      status: "Active",
      organization: "Lendsqr",
    },
    {
      id: "2",
      username: "TestUser2",
      email: "test2@example.com",
      phoneNumber: "0987654321",
      dateJoined: "2023-01-02",
      status: "Inactive",
      organization: "Irorun",
    },
  ],
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
};

describe("Users Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSuspenseQuery.mockReturnValue({ data: mockUsersData });
  });

  it("renders page title", () => {
    render(<Users />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("renders stats grid with loader data", () => {
    render(<Users />);
    expect(screen.getByTestId("stats-grid")).toHaveTextContent("Total: 100");
  });

  it("renders users list with data from query", async () => {
    render(<Users />);

    // Check if user data is displayed (UsersTable renders these fields)
    expect(screen.getByText("TestUser1")).toBeInTheDocument();
    expect(screen.getByText("test1@example.com")).toBeInTheDocument();
    expect(screen.getByText("TestUser2")).toBeInTheDocument();
  });

  it("renders empty state when no users found", () => {
    mockUseSuspenseQuery.mockReturnValue({
      data: {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      },
    });

    render(<Users />);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });
});
