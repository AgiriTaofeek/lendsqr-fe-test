import { useRouter, getRouteApi } from "@tanstack/react-router";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";

const routeApi = getRouteApi("/_protected/users/$id");

export function UserDetailsHeader() {
  const router = useRouter();
  const { id } = routeApi.useParams();

  const handleStatusChange = async (status: "Active" | "Blacklisted") => {
    try {
      await fetch(`/api/users/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      toast.success(
        `User ${status === "Active" ? "Activated" : "Blacklisted"} successfully`,
      );
      router.invalidate(); // Refetch the user details
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

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
            onClick={() => handleStatusChange("Blacklisted")}
          >
            Blacklist User
          </button>
          <button
            className="user-details__btn user-details__btn--activate"
            onClick={() => handleStatusChange("Active")}
          >
            Activate User
          </button>
        </div>
      </div>
    </>
  );
}
