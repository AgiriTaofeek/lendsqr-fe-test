import { Outlet } from "@tanstack/react-router";
import { LeftPanel } from "./left-panel";

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <LeftPanel />
      <Outlet />
    </div>
  );
}
