import { Link } from "@tanstack/react-router";
import type { UserProfile } from "@/types/types";
import { HeaderLogo } from "./header-logo";
import { SearchBar } from "./search-bar";
import { NotificationBell } from "./notification-bell";
import { UserProfileMenu } from "./user-profile";

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
    <header className="header">
      <div className="header__left-section">
        <HeaderLogo toggleSidebar={toggleSidebar} />
        <SearchBar />
      </div>
      <div className="header__right-section">
        <Link to="/" className="header__link">
          Docs
        </Link>
        <NotificationBell />
        <UserProfileMenu user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}
