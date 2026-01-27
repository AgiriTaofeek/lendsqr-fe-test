import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      // Supabase handles session persistence automatically,
      // but we can store user details if needed for quick access
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Navigate to dashboard (index route)
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // In a real app, you might show a toast notification here
    },
  });
};
