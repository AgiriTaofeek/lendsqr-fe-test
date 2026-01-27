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
