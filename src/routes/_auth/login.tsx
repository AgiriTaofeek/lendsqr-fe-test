import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/login/components/auth-layout";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({
    meta: [
      { title: "Login - Lendsqr" },
      { name: "description", content: "Sign in to your Lendsqr dashboard" },
    ],
  }),
  component: AuthLayout,
});
