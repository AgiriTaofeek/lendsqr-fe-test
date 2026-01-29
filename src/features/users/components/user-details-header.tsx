import { getRouteApi } from "@tanstack/react-router";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useState } from "react";
import { useUpdateUserStatus } from "@/features/users/hooks/use-update-user-status";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const routeApi = getRouteApi("/_protected/users/$id");

type ActionType = "Blacklisted" | "Active" | null;

export function UserDetailsHeader() {
  const { id } = routeApi.useParams();
  const { mutate: updateStatus, isPending } = useUpdateUserStatus(id);
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
      <button
        className="user-details__back-btn"
        onClick={() => window.history.back()}
      >
        <HiOutlineArrowNarrowLeft size={20} />
        Back to Users
      </button>

      <div className="user-details__header">
        <h1 className="user-details__title">User Details</h1>
        <div className="user-details__actions">
          <button
            className="user-details__btn user-details__btn--blacklist"
            onClick={() => handleActionClick("Blacklisted")}
          >
            Blacklist User
          </button>
          <button
            className="user-details__btn user-details__btn--activate"
            onClick={() => handleActionClick("Active")}
          >
            Activate User
          </button>
        </div>
      </div>

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
              // Keep original styling logic: Blacklist -> Danger, Activate -> Primary
              variant={isBlacklisting ? "danger" : "primary"}
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
