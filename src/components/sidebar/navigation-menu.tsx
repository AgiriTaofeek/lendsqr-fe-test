import { NAV_ITEMS } from "@/constants/sidebar-data";
import { NavigationSection } from "./navigation-section";

export function NavigationMenu({ currentPath }: { currentPath: string }) {
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
