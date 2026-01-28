import { getRouteApi } from "@tanstack/react-router";
import { StatsGrid } from "./stats-grid";
import { UsersTable } from "./users-table";
import { Pagination } from "./pagination";

const routeApi = getRouteApi("/_protected/users/");

export function Users() {
  const { data: users, meta } = routeApi.useLoaderData();
  const navigate = routeApi.useNavigate();

  const handlePageChange = (page: number) => {
    navigate({ search: (prev: any) => ({ ...prev, page }) });
  };

  const handleItemsPerPageChange = (limit: number) => {
    navigate({ search: (prev: any) => ({ ...prev, limit, page: 1 }) });
  };

  return (
    <div className="users-page">
      <h1 className="users-page__title">Users</h1>

      <StatsGrid />

      <UsersTable users={users} />

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        itemsPerPage={meta.limit}
        totalItems={meta.total}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
