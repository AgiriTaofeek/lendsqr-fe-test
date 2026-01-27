import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from "@tanstack/react-router";
//
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLogin,
  loginSchema,
  type LoginFormData,
} from "../../hooks/useLogin";

export function RightPanel() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending, isError } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="login-page__content">
      <div className="login-page__form-wrapper">
        <h1 className="login-page__title">Welcome!</h1>
        <p className="login-page__subtitle">Enter details to login.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div>
            <Input
              type="email"
              placeholder="Email"
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <span
                style={{
                  color: "#E4033B",
                  fontSize: "12px",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              disabled={isPending}
              rightElement={
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              }
              {...register("password")}
            />
            {errors.password && (
              <span
                style={{
                  color: "#E4033B",
                  fontSize: "12px",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.password.message}
              </span>
            )}
          </div>

          <Link to="/" className="forgot-password">
            Forgot PASSWORD?
          </Link>

          {/* Error Message */}
          {isError && (
            <div
              style={{
                color: "#E4033B",
                fontSize: "14px",
                marginBottom: "16px",
                fontWeight: "bold",
              }}
            >
              Login failed. Please check your credentials.
            </div>
          )}

          <Button type="submit" isLoading={isPending}>
            {isPending ? "LOGGING IN..." : "LOG IN"}
          </Button>

          {/* TEMP: Test User Creation Button */}
          {/* <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            <button
              type="button"
              style={{
                background: "none",
                border: "1px dashed #ccc",
                padding: "8px",
                width: "100%",
                fontSize: "12px",
                cursor: "pointer",
                color: "#666",
              }}
              onClick={async () => {
                const { createTestUser } =
                  await import("@/utils/create-test-user");
                createTestUser({
                  email: "lendsqr@example.com",
                  password: "12345678",
                  displayName: "Lendsqr Admin",
                })
                  .then(() =>
                    alert("Test user creation attempted! Check console."),
                  )
                  .catch((e) => alert("Error: " + e.message));
              }}
            >
              (DEV) Create Test User
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
