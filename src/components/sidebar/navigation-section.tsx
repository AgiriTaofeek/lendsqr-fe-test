import type { NavSection } from "@/types/types";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";

export function NavigationSection({
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
