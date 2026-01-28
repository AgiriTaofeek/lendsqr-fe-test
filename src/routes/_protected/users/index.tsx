import { Users } from "@/features/users/components/users";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const usersSearchSchema = z.object({
  page: z.number().optional().catch(1),
  limit: z.number().optional().catch(10),
  search: z.string().optional(),
  org: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Pending", "Blacklisted"]).optional(),
});

export const Route = createFileRoute("/_protected/users/")({
  validateSearch: usersSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const params = new URLSearchParams();
    if (search.page) params.set("page", search.page.toString());
    if (search.limit) params.set("limit", search.limit.toString());
    if (search.search) params.set("search", search.search);
    if (search.org) params.set("org", search.org);
    if (search.status) params.set("status", search.status);

    const response = await fetch(`/api/users?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },
  component: Users,
});
