import type { ReactNode } from "react";

// Navigation item type
export interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
}

// Navigation section type
export interface NavSection {
  section: string;
  items: NavItem[];
}

// Organization type
export interface Organization {
  id: string;
  name: string;
}

// User profile type
export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  orgName: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    gender: string;
  };
  accountBalance: string;
  accountNumber: string;
  bvn: string;
  gender: string;
  tier: number;
}
