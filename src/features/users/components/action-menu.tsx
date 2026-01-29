import { Link } from "@tanstack/react-router";
import { FiEye, FiUserX, FiUserCheck } from "react-icons/fi";
import { useUpdateUserStatus } from "@/features/users/hooks/use-update-user-status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ActionMenuProps {
  userId: string;
  trigger: React.ReactNode;
}

type ActionType = "Blacklisted" | "Active" | null;

export function ActionMenu({ userId, trigger }: ActionMenuProps) {
  const { mutate: updateStatus, isPending } = useUpdateUserStatus(userId);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleActionClick = (type: ActionType) => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (actionType) {
      updateStatus(actionType, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };

  const isBlacklisting = actionType === "Blacklisted";

  return (
    <>
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
            onSelect={() => handleActionClick("Blacklisted")}
          >
            <FiUserX /> Blacklist User
          </DropdownMenuItem>

          <DropdownMenuItem
            className="users-page__menu-item"
            onSelect={() => handleActionClick("Active")}
          >
            <FiUserCheck /> Activate User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isBlacklisting ? "Blacklist User" : "Activate User"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              {isBlacklisting ? "blacklist" : "activate"} this user? This action
              will update their access permissions immediately.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className={isBlacklisting ? "btn--danger" : "btn--primary"}
              onClick={handleConfirm}
              isLoading={isPending}
            >
              {isBlacklisting ? "Blacklist" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
