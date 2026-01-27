// Simulating a backend API service

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const mockLogin = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simple validation simulation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Return mock success response
  return {
    token: "mock-jwt-token-xyz-123",
    user: {
      id: "1",
      email: email,
      name: "Lendsqr User",
    },
  };
};
