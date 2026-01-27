import { Link, useLocation } from "@tanstack/react-router";
import classNames from "classnames";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
  NAV_ITEMS,
  ORGANIZATIONS,
  APP_VERSION,
} from "@/constants/sidebar-data";
import { MEDIA_QUERIES } from "@/constants/media-query";
import type { Organization, NavSection } from "@/types/types";
import { useMediaQuery } from "@/hooks/use-media-query";

// ============================================================================
// Types
// ============================================================================

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentOrganization?: Organization;
  onOrganizationChange?: (org: Organization) => void;
  onLogout?: () => void;
}

// ============================================================================
// Main Component
// ============================================================================

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

// ============================================================================
// Sub-Components
// ============================================================================

/**
 * Mobile overlay that appears behind sidebar on mobile
 */
function MobileOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={classNames("dashboard-layout__overlay", {
        "dashboard-layout__overlay--visible": isOpen,
      })}
      onClick={onClose}
      role="presentation"
      aria-hidden={!isOpen}
    />
  );
}

/**
 * Organization switcher dropdown
 */
function OrganizationSwitcher({
  currentOrganization,
  isDesktop,
  onOrganizationSelect,
}: {
  currentOrganization: Organization;
  isDesktop: boolean;
  onOrganizationSelect: (org: Organization) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <div
          className="sidebar__switch-org"
          role="button"
          tabIndex={0}
          aria-label="Switch organization"
        >
          <FaBriefcase aria-hidden="true" />
          <span className="sidebar__switch-org-text">Switch Organization</span>
          <IoIosArrowDown
            aria-hidden="true"
            className={classNames("sidebar__switch-org-icon", {
              "sidebar__switch-org-icon--open-desktop": isOpen && isDesktop,
              "sidebar__switch-org-icon--open-mobile": isOpen && !isDesktop,
            })}
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-menu__content"
          side={isDesktop ? "right" : "bottom"}
          sideOffset={10}
          align={isDesktop ? "start" : "center"}
        >
          {ORGANIZATIONS.map((org) => (
            <DropdownMenu.Item
              key={org.id}
              className="dropdown-menu__item"
              onSelect={() => onOrganizationSelect(org)}
            >
              <span>{org.name}</span>
              {currentOrganization.id === org.id && (
                <span className="dropdown-menu__check" aria-label="Selected">
                  ✓
                </span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/**
 * Navigation menu with all sections and items
 */
function NavigationMenu({ currentPath }: { currentPath: string }) {
  return (
    <nav className="sidebar__nav-scroll">
      {NAV_ITEMS.map((group) => (
        <NavigationSection
          key={group.section || "main"}
          section={group}
          currentPath={currentPath}
        />
      ))}
    </nav>
  );
}

/**
 * Single navigation section (e.g., CUSTOMERS, BUSINESSES)
 */
function NavigationSection({
  section,
  currentPath,
}: {
  section: NavSection;
  currentPath: string;
}) {
  return (
    <div className="sidebar__section">
      {section.section && (
        <div className="sidebar__header">{section.section}</div>
      )}
      {section.items.map((item) => {
        const isActive =
          currentPath === item.path ||
          (item.path !== "/" && currentPath.startsWith(item.path));
        return (
          <Link
            key={item.path}
            to={item.path}
            className={classNames("sidebar__item", {
              "sidebar__item--active": isActive,
            })}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="sidebar__item-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Sidebar footer with logout button and version
 */
function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="sidebar__footer">
      <button
        className="sidebar__logout"
        onClick={onLogout}
        aria-label="Logout"
      >
        <FaSignOutAlt aria-hidden="true" />
        <span>Logout</span>
      </button>
      <div className="sidebar__version" aria-label={`Version ${APP_VERSION}`}>
        v{APP_VERSION}
      </div>
    </div>
  );
}
