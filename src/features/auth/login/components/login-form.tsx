import { Input } from "@/features/auth/login/components/Input";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLogin,
  loginSchema,
  type LoginFormData,
} from "../../hooks/useLogin";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
      <div className="form__field-wrapper">
        <Input
          type="email"
          placeholder="Email"
          disabled={isPending}
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email")}
        />
        {errors.email && (
          <span className="form__error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form__field-wrapper">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          disabled={isPending}
          aria-invalid={errors.password ? "true" : "false"}
          rightElement={
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isPending}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          }
          {...register("password")}
        />
        {errors.password && (
          <span className="form__error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      <Link to="/" className="forgot-password">
        Forgot password?
      </Link>

      <Button type="submit" isLoading={isPending}>
        {isPending ? "LOGGING IN..." : "LOG IN"}
      </Button>
    </form>
  );
}
