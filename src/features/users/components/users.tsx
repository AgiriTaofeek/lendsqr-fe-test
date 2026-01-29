import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { usersQueryOptions } from "../queries";
import { StatsGrid } from "./stats-grid";
import { UsersTable } from "./users-table";
import { Pagination } from "./pagination";

const routeApi = getRouteApi("/_protected/users/");

import { Suspense, useEffect } from "react";

export function Users() {
  const { stats } = routeApi.useLoaderData();
  const search = routeApi.useSearch();

  return (
    <div className="users-page">
      <h1 className="users-page__title">Users</h1>

      <StatsGrid stats={stats} />

      <Suspense fallback={<UsersTable users={[]} isLoading={true} />}>
        <UsersList search={search} />
      </Suspense>
    </div>
  );
}

interface UsersSearch {
  page?: number;
  limit?: number;
  search?: string;
  org?: string;
  status?: string;
}

function UsersList({ search }: { search: UsersSearch }) {
  const navigate = routeApi.useNavigate();
  const { data: usersData } = useSuspenseQuery(
    usersQueryOptions({
      ...search,
      page: search.page || 1,
      limit: search.limit || 10,
    }),
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (usersData.meta.page < usersData.meta.totalPages) {
      const nextPage = usersData.meta.page + 1;
      queryClient.prefetchQuery(
        usersQueryOptions({
          ...search,
          page: nextPage,
          limit: search.limit || 10,
        }),
      );
    }
  }, [usersData.meta.page, usersData.meta.totalPages, search, queryClient]);

  const users = usersData.data;
  const meta = usersData.meta;

  const handlePageChange = (page: number) => {
    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        page: page === 1 ? undefined : page,
      }),
      resetScroll: false,
    });
  };

  const handleItemsPerPageChange = (limit: number) => {
    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        limit,
        page: undefined,
      }),
      resetScroll: false,
    });
  };

  return (
    <>
      <UsersTable users={users} isLoading={false} />

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        itemsPerPage={meta.limit}
        totalItems={meta.total}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
}
