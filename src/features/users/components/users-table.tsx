import classNames from "classnames";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import type { User } from "../data";
import { ActionMenu } from "./action-menu";
import { FilterForm } from "./filter-form";

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="users-page__table-wrapper">
        <table className="users-page__table">
          <TableHead />
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {HEADERS.map((_, index) => (
                  <td key={index}>
                    <div className="users-page__skeleton" />
                  </td>
                ))}
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="users-page__table-wrapper">
        <div className="users-page__empty-state">
          No users found matching your criteria.
        </div>
      </div>
    );
  }

  return (
    <div className="users-page__table-wrapper">
      <table className="users-page__table">
        <TableHead />
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
                    <button className="users-page__action-btn">
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

const HEADERS = [
  "Organization",
  "Username",
  "Email",
  "Phone Number",
  "Date Joined",
  "Status",
];

function TableHead() {
  return (
    <thead>
      <tr>
        {HEADERS.map((header) => (
          <th key={header}>
            <div className="users-page__th-content">
              {header}
              <FilterForm
                trigger={
                  <button
                    className="users-page__filter-btn"
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
  );
}
