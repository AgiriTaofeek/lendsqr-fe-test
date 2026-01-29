import { UserDetails } from "@/features/users/components/user-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/users/$id")({
  loader: async ({ params: { id } }) => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  },
  component: UserDetails,
  staleTime: 5 * 60 * 1000,
  preloadStaleTime: 5 * 60 * 1000,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${(loaderData as any).username || "User"} - User Details - Lendsqr`,
      },
      { name: "description", content: "View detailed user information" },
    ],
  }),
});
