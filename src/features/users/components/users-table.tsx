import classNames from "classnames";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import type { User } from "../data";
import { ActionMenu } from "./action-menu";
import { FilterForm } from "./filter-form";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="users-page__table-wrapper">
      <table className="users-page__table">
        <thead>
          <tr>
            {[
              "Organization",
              "Username",
              "Email",
              "Phone Number",
              "Date Joined",
              "Status",
            ].map((header) => (
              <th key={header}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {header}
                  <FilterForm
                    trigger={
                      <button
                        style={{
                          display: "flex",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        aria-label={`Filter ${header}`}
                      >
                        <IoFilterSharp className="filter-icon" />
                      </button>
                    }
                  />
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateJoined}</td>
              <td>
                <span
                  className={classNames("users-page__status", {
                    "users-page__status--active": user.status === "Active",
                    "users-page__status--inactive": user.status === "Inactive",
                    "users-page__status--pending": user.status === "Pending",
                    "users-page__status--blacklisted":
                      user.status === "Blacklisted",
                  })}
                >
                  {user.status}
                </span>
              </td>
              <td className="users-page__action-cell">
                <ActionMenu
                  userId={user.id}
                  trigger={
                    <button
                      className="users-page__action-btn"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <BsThreeDotsVertical size={16} color="#545F7D" />
                    </button>
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
