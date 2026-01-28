export interface AuthState {
  isAuthenticated: boolean;
  username?: string;
}

export type AuthContext = {
  isAuthenticated: boolean;
  signIn: (username: string) => void;
  signOut: () => void;
  username?: string;
};

const STORAGE_KEY = "lendsqr_auth_user";

export const auth: AuthContext = {
  isAuthenticated: !!localStorage.getItem(STORAGE_KEY),
  username: localStorage.getItem(STORAGE_KEY) || undefined,

  signIn: (username: string) => {
    localStorage.setItem(STORAGE_KEY, username);
    auth.isAuthenticated = true;
    auth.username = username;
  },

  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
    auth.isAuthenticated = false;
    auth.username = undefined;
  },
};
