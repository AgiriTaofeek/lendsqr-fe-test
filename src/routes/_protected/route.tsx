import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DashboardLayout,
});
