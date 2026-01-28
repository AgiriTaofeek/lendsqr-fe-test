import { Link } from "@tanstack/react-router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiEye, FiUserX, FiUserCheck } from "react-icons/fi";

interface ActionMenuProps {
  userId: string;
  trigger: React.ReactNode;
}

export function ActionMenu({ userId, trigger }: ActionMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="users-page__menu"
          side="bottom"
          align="end"
          sideOffset={5}
        >
          <DropdownMenu.Item asChild className="users-page__menu-item">
            <Link to={`/users/$id`} params={{ id: userId }}>
              <FiEye /> View Details
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="users-page__menu-item"
            onSelect={() => console.log(`Blacklist user ${userId}`)}
          >
            <FiUserX /> Blacklist User
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="users-page__menu-item"
            onSelect={() => console.log(`Activate user ${userId}`)}
          >
            <FiUserCheck /> Activate User
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
