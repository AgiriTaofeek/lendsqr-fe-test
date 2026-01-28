import type { Organization } from "@/types/types";
import { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "classnames";
import { ORGANIZATIONS } from "@/constants/sidebar-data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function OrganizationSwitcher({
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
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          side={isDesktop ? "right" : "bottom"}
          sideOffset={10}
          align={isDesktop ? "start" : "center"}
        >
          {ORGANIZATIONS.map((org) => (
            <DropdownMenuItem
              key={org.id}
              onSelect={() => onOrganizationSelect(org)}
            >
              <span>{org.name}</span>
              {currentOrganization.id === org.id && (
                <span className="dropdown-menu__check" aria-label="Selected">
                  ✓
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
