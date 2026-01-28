import { statsQueryOptions, usersQueryOptions } from "@/features/users/queries";
import { defaultValues, usersSearchSchema } from "@/features/users/search";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { Users } from "@/features/users/components/users";

export const Route = createFileRoute("/_protected/users/")({
  validateSearch: usersSearchSchema,
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  loaderDeps: ({ search }) => ({
    page: search.page || defaultValues.page,
    limit: search.limit || defaultValues.limit,
    search: search.search,
    org: search.org,
    status: search.status,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    // Start fetching users in background
    queryClient.prefetchQuery(usersQueryOptions(deps));

    // Ensure stats are available (blocking but rarely fetches)
    const stats = await queryClient.ensureQueryData(statsQueryOptions);

    return {
      stats,
    };
  },
  component: Users,
});
