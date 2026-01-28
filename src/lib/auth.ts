import type { UserProfile } from "@/types/types";

export interface AuthState {
  isAuthenticated: boolean;
  user?: UserProfile;
}

export type AuthContext = {
  isAuthenticated: boolean;
  signIn: (user: UserProfile) => void;
  signOut: () => void;
  user?: UserProfile;
};

const STORAGE_KEY = "lendsqr_auth_user";

const getStoredUser = (): UserProfile | undefined => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return undefined;
  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    return undefined;
  }
};

export const auth: AuthContext = {
  isAuthenticated: !!localStorage.getItem(STORAGE_KEY),
  user: getStoredUser(),

  signIn: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    auth.isAuthenticated = true;
    auth.user = user;
  },

  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
    auth.isAuthenticated = false;
    auth.user = undefined;
  },
};
