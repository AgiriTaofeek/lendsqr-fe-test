import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import type { Organization } from "@/types/types";
import { ORGANIZATIONS } from "@/constants/sidebar-data";
import {
  Outlet,
  createFileRoute,
  useLocation,
  redirect,
  useRouter,
  useNavigate,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
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
