import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { usersKeys } from "../queries";

export const useUpdateUserStatus = (userId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
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
      toast.success(
        `User ${status === "Active" ? "Activated" : "Blacklisted"} successfully`,
      );
      // Invalidate both Router (for loader data) and Query (for caching)
      router.invalidate();
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });
};
