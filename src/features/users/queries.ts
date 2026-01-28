import { queryOptions } from "@tanstack/react-query";
import { defaultValues } from "./search";

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params: unknown) => [...usersKeys.lists(), params] as const,
  stats: () => [...usersKeys.all, "stats"] as const,
};
export const usersQueryOptions = (
  params: typeof defaultValues & {
    search?: string;
    org?: string;
    status?: string;
  },
) =>
  queryOptions({
    queryKey: usersKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());
      if (params.search) searchParams.set("search", params.search);
      if (params.org) searchParams.set("org", params.org);
      if (params.status) searchParams.set("status", params.status);

      const response = await fetch(`/api/users?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const statsQueryOptions = queryOptions({
  queryKey: usersKeys.stats(),
  queryFn: async () => {
    const response = await fetch("/api/users/stats");
    if (!response.ok) throw new Error("Failed to fetch stats");
    return response.json();
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});
