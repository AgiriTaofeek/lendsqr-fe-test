import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserProfile } from "@/types/types";
import { IoMdArrowDropdown } from "react-icons/io";
export function UserProfileMenu({
  user,
  onLogout,
}: {
  user: UserProfile;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="user-profile" role="button" tabIndex={0}>
          <img
            src={user.avatarUrl}
            alt={`${user.name}'s avatar`}
            className="user-profile__image"
          />
          <span className="user-profile__name">{user.name}</span>
          <IoMdArrowDropdown className="user-profile__icon" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={10} align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={onLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
