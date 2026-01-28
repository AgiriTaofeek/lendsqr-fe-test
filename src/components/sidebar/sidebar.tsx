import { useLocation } from "@tanstack/react-router";
import classNames from "classnames";
import { ORGANIZATIONS } from "@/constants/sidebar-data";
import { MEDIA_QUERIES } from "@/constants/media-query";
import type { Organization } from "@/types/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileOverlay } from "./mobile-overlay";
import { OrganizationSwitcher } from "./organization-switcher";
import { NavigationMenu } from "./navigation-menu";
import { SidebarFooter } from "./sidebar-footer";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentOrganization?: Organization;
  onOrganizationChange?: (org: Organization) => void;
  onLogout?: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  currentOrganization = ORGANIZATIONS[0],
  onOrganizationChange,
  onLogout,
}: SidebarProps) {
  const location = useLocation();
  const isDesktop = useMediaQuery(MEDIA_QUERIES.TABLET);

  const handleOrganizationSelect = (org: Organization) => {
    if (onOrganizationChange) {
      onOrganizationChange(org);
    } else {
      console.warn("No organization change handler provided");
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.warn("No logout handler provided");
    }
  };

  return (
    <>
      <MobileOverlay isOpen={isOpen} onClose={onClose} />
      <aside
        className={classNames("dashboard-layout__sidebar sidebar", {
          "sidebar--open": isOpen,
        })}
        aria-label="Main navigation"
      >
        <OrganizationSwitcher
          currentOrganization={currentOrganization}
          isDesktop={isDesktop}
          onOrganizationSelect={handleOrganizationSelect}
        />
        <NavigationMenu currentPath={location.pathname} />
        <SidebarFooter onLogout={handleLogout} />
      </aside>
    </>
  );
}
