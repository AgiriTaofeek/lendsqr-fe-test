import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
