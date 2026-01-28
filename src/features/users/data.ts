import { faker } from "@faker-js/faker";

export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;

  // Detailed Profile Fields
  tier: number;
  amount: string;
  bank: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;

  education: {
    level: string;
    status: string;
    sector: string;
    duration: string;
    officeEmail: string;
    income: string;
    repayment: string;
  };

  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  guarantor: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
}

export const ORGANIZATIONS = ["Lendsqr", "Irorun", "Lendstar"];
export const STATUSES: UserStatus[] = [
  "Active",
  "Inactive",
  "Pending",
  "Blacklisted",
];

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const organization = faker.helpers.arrayElement(ORGANIZATIONS);
    const email = faker.internet
      .email({ firstName, lastName, provider: "lendsqr.com" })
      .toLowerCase();

    return {
      id: faker.string.uuid(),
      organization,
      username: fullName,
      email,
      phoneNumber: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
      dateJoined: faker.date.past({ years: 3 }).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      status: faker.helpers.arrayElement(STATUSES),

      // Detailed Fields
      tier: faker.number.int({ min: 1, max: 3 }),
      amount: `₦${faker.finance.amount({ min: 10000, max: 500000, dec: 2, symbol: "" })}`,
      bank: `${faker.finance.accountNumber(10)}/${faker.finance.accountName()} Bank`,
      bvn: faker.finance.accountNumber(11),
      gender: faker.person.sexType() === "female" ? "Female" : "Male",
      maritalStatus: faker.helpers.arrayElement([
        "Single",
        "Married",
        "Divorced",
      ]),
      children: faker.helpers.arrayElement(["None", "1", "2", "3+"]),
      residence: faker.helpers.arrayElement([
        "Parent's Apartment",
        "Own Apartment",
        "Rented Apartment",
      ]),

      education: {
        level: faker.helpers.arrayElement(["B.Sc", "M.Sc", "Ph.D"]),
        status: "Employed",
        sector: faker.commerce.department(),
        duration: `${faker.number.int({ min: 1, max: 10 })} years`,
        officeEmail: email, // Re-use email for simplicity
        income: `₦${faker.finance.amount({ min: 100000, max: 300000, dec: 2 })} - ₦${faker.finance.amount({ min: 300000, max: 600000, dec: 2 })}`,
        repayment: faker.finance.amount({ min: 20000, max: 50000, dec: 2 }),
      },

      socials: {
        twitter: `@${firstName.toLowerCase()}`,
        facebook: fullName,
        instagram: `@${firstName.toLowerCase()}`,
      },

      guarantor: {
        name: faker.person.fullName(),
        phone: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: faker.internet.email(),
        relationship: faker.helpers.arrayElement([
          "Sister",
          "Brother",
          "Friend",
          "Parent",
        ]),
      },
    };
  });
};

export const MOCK_USERS = generateMockUsers(500);
