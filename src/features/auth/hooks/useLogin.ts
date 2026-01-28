import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { toast } from "react-toastify";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      // Sync with our Router Auth Context
      if (data.user?.email) {
        auth.signIn(data.user.email);
      }

      // Invalidate router to ensure the beforeLoad check re-runs immediately
      router.invalidate();

      // Navigate to dashboard
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(
        error.message || "Login failed. Please check your credentials.",
      );
    },
  });
};
