import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import type { Organization } from "@/types/types";
import { ORGANIZATIONS } from "@/constants/sidebar-data";
import {
  Outlet,
  useLocation,
  useRouter,
  useNavigate,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { auth } from "@/lib/auth";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentOrg, setCurrentOrg] = useState<Organization>(ORGANIZATIONS[0]);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleOrganizationChange = (org: Organization) => {
    setCurrentOrg(org);
    console.log("Organization changed to:", org.name);
    // In production, this would trigger API calls, update context, etc.
  };

  const router = useRouter();
  const navigate = useNavigate();

  // ... (existing code)

  const handleLogout = () => {
    // 1. Clear local auth state
    auth.signOut();

    // 2. Invalidate router to trigger guards
    router.invalidate();

    // 3. Redirect
    navigate({ to: "/login" });
  };

  return (
    <div className="dashboard-layout">
      <Header
        user={auth.user}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />
      <div className="dashboard-layout__body">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentOrganization={currentOrg}
          onOrganizationChange={handleOrganizationChange}
          onLogout={handleLogout}
        />
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
