import { FaRegBell } from "react-icons/fa";

export function NotificationBell() {
  return (
    <div
      className="notification-bell"
      role="button"
      tabIndex={0}
      aria-label="View notifications"
    >
      <FaRegBell />
    </div>
  );
}
