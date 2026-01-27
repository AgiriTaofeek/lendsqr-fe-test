import { AuthLayout } from "@/features/auth/login/components/auth-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});
