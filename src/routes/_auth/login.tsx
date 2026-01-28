import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/login/components/auth-layout";

export const Route = createFileRoute("/_auth/login")({
  component: AuthLayout,
});
