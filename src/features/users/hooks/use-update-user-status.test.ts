import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUpdateUserStatus } from "./use-update-user-status";
import { toast } from "react-toastify";

// Mock dependencies
const mockRouterInvalidate = vi.fn();
const mockQueryClientInvalidate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ invalidate: mockRouterInvalidate }),
}));

vi.mock("@tanstack/react-query", () => {
  return {
    useQueryClient: () => ({
      invalidateQueries: mockQueryClientInvalidate,
    }),
    queryOptions: (opts: any) => opts,
    useMutation: ({ mutationFn, onSuccess, onError }: any) => {
      // Return a manual mock of mutation that we can trigger
      return {
        mutate: (vars: any) => {
          // Simulate the promise result of mutationFn
          mutationFn(vars)
            .then((res: any) => onSuccess(res, vars))
            .catch((err: any) => onError(err));
        },
      };
    },
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock global fetch
global.fetch = vi.fn();

describe("useUpdateUserStatus Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls API and invalidates cache on success", async () => {
    // Mock successful fetch
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const { result } = renderHook(() => useUpdateUserStatus("123"));

    // Trigger mutation
    result.current.mutate("Blacklisted");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/users/123/status",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ status: "Blacklisted" }),
        }),
      );

      expect(toast.success).toHaveBeenCalled();
      expect(mockRouterInvalidate).toHaveBeenCalled();
      expect(mockQueryClientInvalidate).toHaveBeenCalled();
    });
  });

  it("handles API error correctly", async () => {
    // Mock failed fetch
    (global.fetch as any).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useUpdateUserStatus("123"));

    result.current.mutate("Active");

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(mockRouterInvalidate).not.toHaveBeenCalled();
    });
  });
});
