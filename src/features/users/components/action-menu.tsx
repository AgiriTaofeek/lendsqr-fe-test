import { Link } from "@tanstack/react-router";
import { FiEye, FiUserX, FiUserCheck } from "react-icons/fi";
import { useUpdateUserStatus } from "@/features/users/hooks/use-update-user-status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionMenuProps {
  userId: string;
  trigger: React.ReactNode;
}

export function ActionMenu({ userId, trigger }: ActionMenuProps) {
  const { mutate: updateStatus } = useUpdateUserStatus(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="users-page__menu"
        side="bottom"
        align="end"
      >
        <DropdownMenuItem asChild className="users-page__menu-item">
          <Link to={`/users/$id`} params={{ id: userId }}>
            <FiEye /> View Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="users-page__menu-item"
          onSelect={() => updateStatus("Blacklisted")}
        >
          <FiUserX /> Blacklist User
        </DropdownMenuItem>

        <DropdownMenuItem
          className="users-page__menu-item"
          onSelect={() => updateStatus("Active")}
        >
          <FiUserCheck /> Activate User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
