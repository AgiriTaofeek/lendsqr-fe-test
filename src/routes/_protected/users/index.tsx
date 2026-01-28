import { Users } from "@/features/users/components/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/users/")({
  component: Users,
});
