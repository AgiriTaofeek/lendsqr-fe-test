export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
}

const ORGANIZATIONS = ["Lendsqr", "Irorun", "Lendstar"];
const STATUSES: UserStatus[] = ["Active", "Inactive", "Pending", "Blacklisted"];

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const org = ORGANIZATIONS[Math.floor(Math.random() * ORGANIZATIONS.length)];

    return {
      id: (i + 1).toString(),
      organization: org,
      username: `User${i + 1}`,
      email: `user${i + 1}@${org.toLowerCase()}.com`,
      phoneNumber: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
      dateJoined: new Date(
        2020 + Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 28),
      ).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      status,
    };
  });
};

export const MOCK_USERS = generateMockUsers(500);
