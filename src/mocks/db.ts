import { generateMockUsers, type User } from "../features/users/data";

const STORAGE_KEY = "lendsqr_users_db_v2";

export const db = {
  // Initialize DB with 500 users if empty
  init: () => {
    if (typeof window === "undefined") return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const users = generateMockUsers(500);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  },

  getAll: (): User[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  },

  getById: (id: string): User | undefined => {
    const users = db.getAll();
    return users.find((u) => u.id === id);
  },

  update: (id: string, updates: Partial<User>) => {
    const users = db.getAll();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return users[index];
    }
    return null;
  },
};
