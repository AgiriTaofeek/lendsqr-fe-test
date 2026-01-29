import { Dashboard } from "@/features/dashboard/components/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/")({
  head: () => ({
    meta: [
      { title: "Dashboard - Lendsqr" },
      { name: "description", content: "Overview of your lending metrics" },
    ],
  }),
  component: Dashboard,
});
