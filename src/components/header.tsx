import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import logo from "@/assets/images/lensqr-logo.svg";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { UserProfile } from "@/types/types";

// ============================================================================
// Types & Constants
// ============================================================================

interface HeaderProps {
  toggleSidebar: () => void;
  user?: UserProfile;
  onLogout?: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: "Adedeji",
  email: "adedeji@lendsqr.com",
  avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah",
};

export function Header({
  toggleSidebar,
  user = DEFAULT_USER,
  onLogout,
}: HeaderProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.warn("No logout handler provided");
    }
  };

  return (
    <header className="dashboard-layout__header header">
      <HeaderLogo toggleSidebar={toggleSidebar} />
      <SearchBar />
      <div className="header__right">
        <Link to="/" className="header__link">
          Docs
        </Link>
        <NotificationBell />
        <UserProfileMenu user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}

/**
 * Logo and menu button section
 */
function HeaderLogo({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className="header__part-left">
      <button
        className="header__menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
      >
        <GiHamburgerMenu />
      </button>
      <Link to="/" className="header__logo">
        <Image
          src={logo}
          alt="Lendsqr Logo"
          layout="constrained"
          width={145}
          height={30}
        />
      </Link>
    </div>
  );
}

/**
 * Search bar component
 */
function SearchBar() {
  return (
    <div className="header__search">
      <input
        type="search"
        placeholder="Search for anything"
        aria-label="Search"
      />
      <button type="button" aria-label="Submit search">
        <FaSearch />
      </button>
    </div>
  );
}

/**
 * Notification bell icon
 */
function NotificationBell() {
  return (
    <div
      className="header__notification"
      role="button"
      tabIndex={0}
      aria-label="View notifications"
    >
      <FaRegBell />
    </div>
  );
}

/**
 * User profile dropdown menu
 */
function UserProfileMenu({
  user,
  onLogout,
}: {
  user: UserProfile;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="header__profile" role="button" tabIndex={0}>
          <img
            src={user.avatarUrl}
            alt={`${user.name}'s avatar`}
            className="header__profile-image"
          />
          <span className="header__profile-name">{user.name}</span>
          <IoMdArrowDropdown className="header__profile-icon" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-menu__content"
          sideOffset={10}
          align="end"
        >
          <DropdownMenu.Item className="dropdown-menu__item">
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="dropdown-menu__item">
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="dropdown-menu__separator" />
          <DropdownMenu.Item
            className="dropdown-menu__item dropdown-menu__item--danger"
            onSelect={onLogout}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
