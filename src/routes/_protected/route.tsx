import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import type { Organization } from "@/types/types";
import { ORGANIZATIONS } from "@/constants/sidebar-data";
import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_protected")({
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

  const handleLogout = () => {
    console.log("Logout clicked");
    // In production, this would clear auth and redirect to login
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
