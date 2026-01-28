import { Link, getRouteApi, useRouter } from "@tanstack/react-router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiEye, FiUserX, FiUserCheck } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Access the route context to get params if needed,
// though we usually just use queryClient for invalidation.
const routeApi = getRouteApi("/_protected/users/");

interface ActionMenuProps {
  userId: string;
  trigger: React.ReactNode;
}

export function ActionMenu({ userId, trigger }: ActionMenuProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (status: "Active" | "Blacklisted") => {
      const response = await fetch(`/api/users/${userId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: (_, status) => {
      // Invalidate the users list so it re-fetches
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Note: We need to ensure the query key matches what the loader uses?
      // Actually, since we're using TanStack Router loaders, we invalidate the router cache.
      // But let's check how the router key operates. TanStack Router automatically handles loader invalidation
      // if we invalidate the router.

      // With TanStack Router, we should use router.invalidate() to reload loaders.
      // But queryClient invalidation works if the loader uses fetchQuery?
      // Our loader uses direct fetch.
    },
  });

  // Re-thinking: Since our route loader calls `fetch` directly and returns a promise, logic
  // is slightly different than `useQuery`.
  // TanStack Router stores the data. We need to invalidate the router to trigger a reload.

  const navigate = routeApi.useNavigate();
  const router = useRouter();

  const handleStatusChange = async (status: "Active" | "Blacklisted") => {
    try {
      await fetch(`/api/users/${userId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      toast.success(
        `User ${status === "Active" ? "Activated" : "Blacklisted"} successfully`,
      );

      // Invalidate router logic to refetch the current route's loader
      router.invalidate();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="users-page__menu"
          side="bottom"
          align="end"
          sideOffset={5}
        >
          <DropdownMenu.Item asChild className="users-page__menu-item">
            <Link to={`/users/$id`} params={{ id: userId }}>
              <FiEye /> View Details
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="users-page__menu-item"
            onSelect={() => handleStatusChange("Blacklisted")}
          >
            <FiUserX /> Blacklist User
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="users-page__menu-item"
            onSelect={() => handleStatusChange("Active")}
          >
            <FiUserCheck /> Activate User
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
