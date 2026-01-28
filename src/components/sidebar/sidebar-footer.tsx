import { APP_VERSION } from "@/constants/sidebar-data";
import { FaSignOutAlt } from "react-icons/fa";

export function SidebarFooter({ onLogout }: { onLogout: () => void }) {
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
